import React, { useState, useEffect } from 'react';
import mapData3 from './json/SeoulCCTV.json';
import mapData2 from './json/policeOffice.geojson';
import mapData1 from './json/seoul_park.json';
import mapData from './json/seoul.geojson';
const { kakao } = window;

function App() {

  const [map, setMap] = useState(null); // 공원 데이터를 저장할 상태
  useEffect(() => {
    if (!window.kakao) {
      // 카카오 지도 API 스크립트 로드
      const script = document.createElement('script');
      script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=f88a678b17a1251fe4f54b241accf2b6&libraries=services,drawing';
      script.async = true;
      script.onload = () => {
        initializeMap();
      };
      document.body.appendChild(script);

      // 컴포넌트 언마운트 시 스크립트 제거
      return () => {
        document.body.removeChild(script);
      };
    } else {
      initializeMap();
    }
  }, []);

  useEffect(() => {
    if (map) {
      // 지도가 준비되면 실행할 함수
      // 이곳에서 지도 관련 작업을 수행합니다.
      map.setOptions({ draggable: false });
      //이 부분을 원하는 지도 설정으로 변경해주세요.
    }
  }, [map]);


  function initializeMap() {
    //call the kakao map
    const map = new window.kakao.maps.Map(document.getElementById('map'), {
      center: new window.kakao.maps.LatLng(37.514575, 127.0495556),
      level: 6,
      minLevel: 2,
      maxLevel: 8,
      disableDoubleClickZoom: true
    });

    setMap(map);
  }

  function zoomIn() {
    if (map) {
      map.setLevel(map.getLevel() - 1);
    }
  }

  function zoomOut() {
    if (map) {
      map.setLevel(map.getLevel() + 1);
    }
  }


  // call the cctv json
  var cctvjson = JSON.parse(JSON.stringify(mapData3));
  console.log("cctvjson :" + cctvjson);
  //객체를 배열로 바꾸기 위해
  var cctvSet = Object.values(cctvjson);
  console.log("cctvSet : " + cctvSet);
  var cctvs = [];
  let cctvAddr, cctvNum, cctvLat, cctvLon;
  // 배열 순회하며 필요한 정보 추출하여 새로운 배열에 추가
  for (var i = 0; i < cctvSet.length; i++) {
    var element = cctvSet[i];
    cctvAddr = element.Address;
    cctvNum = element.CameraCount;
    cctvLat = element.WGS84Latitude;
    cctvLon = element.WGS84Longitude;

    var oneCctv = { cctvAddr, cctvNum, cctvLat, cctvLon };
    cctvs.push(oneCctv);
  }


  var nearcctvmarkers = [];
  var nearcctvs = [];
  function shownearcctv(latLng) {
    nearcctvs = [];
    var line;

    cctvs.forEach(element => {
      if (element.cctvLon < latLng.La + 0.0045 && element.cctvLon > latLng.La - 0.0045) {
        line = new kakao.maps.Polyline({
          path: [
            new kakao.maps.LatLng(element.cctvLat, element.cctvLon),
            new kakao.maps.LatLng(latLng.Ma, latLng.La)
          ],
          strokeWeight: 1,
          strokeColor: '#fff',
          strokeOpacity: 1,
          strokeStyle: 'solid'
        });
        var linelength = Math.round(line.getLength());
        if (linelength < 500) { nearcctvs.push(element); }
      }
    });
    for (var i = 0; i < nearcctvs.length; i++) {
      var imageSrc = "./img/cctv2.png";
      var imageSize = new kakao.maps.Size(32, 37);
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(nearcctvs[i].cctvLat, nearcctvs[i].cctvLon),
        title: '수량' + nearcctvs[i].cctvNum + '대',
        image: markerImage,
        opacity: 1,
        zIndex: 1
      });
      nearcctvmarkers.push(marker);
    }

  }

  //remove cctvmarker
  function delcctvmarkers() {
    for (var i = 0; i < nearcctvmarkers.length; i++) {
      nearcctvmarkers[i].setMap(null);
    }
    nearcctvmarkers = [];
  }


  console.log("mapData1 잘오는지 : " + mapData1);

  // call the park json
  //var parkjson = JSON.parse(JSON.stringify(mapData1));
  var units = mapData1.DATA;
  var parks = [];
  var circle;

  units.forEach(element => {

    adminName = element.p_name;
    addr = element.p_addr;
    gu = element.p_zone;
    phoneNumber = element.p_admintel;
    content = element.p_list_content;
    pName = element.p_park;
    // visitRoad = element.visit_road;
    useRefer = element.use_refer;
    latitude = element.latitude;
    longitude = element.longitude;
    kakaoposition = new kakao.maps.LatLng(latitude, longitude)

    var onePark = { adminName, addr, gu, phoneNumber, content, pName, useRefer, latitude, longitude, kakaoposition }
    parks.push(onePark);
  })

  console.log("Processed parks:" + parks);

  var policejson = JSON.parse(JSON.stringify(mapData2));
  var dataSet = policejson.features;
  var policeOffice = [];
  let dist;
  var nearpolice = [];
  var nearpolimarker = [];
  var distanceOverlay;
  var guNameOverlay;
  // pre setup json data
  for (var i = 0; i < dataSet.length; i++) {
    if (dataSet[i].properties.h1 === "서울" && dataSet[i].properties.success === true)
      policeOffice.push(dataSet[i].properties);
  }

  //police marker
  function polimarker(latLng) {
    nearpolice = [];
    var line;
    policeOffice.forEach(element => {
      line = new kakao.maps.Polyline({
        path: [
          new kakao.maps.LatLng(element.lat, element.lng),
          new kakao.maps.LatLng(latLng.Ma, latLng.La)
        ],
        strokeWeight: 1,
        strokeColor: '#fff',
        strokeOpacity: 1,
        strokeStyle: 'solid'
      });
      var linelength = Math.round(line.getLength());
      if (linelength < 1700) { nearpolice.push(element) }
    })
    for (var i = 0; i < nearpolice.length; i++) {
      var imageSrc = "../img/police_office_icon.png";
      var imageSize = new kakao.maps.Size(32, 37);
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(nearpolice[i].lat, nearpolice[i].lng),
        title: nearpolice[i].bm[0] + ' (' + nearpolice[i].address + ')',
        image: markerImage,
        opacity: 1,
        zIndex: 1
      });
      nearpolimarker.push(marker);
    }
  }

  // remove police marker
  function deletemarker() {
    for (var i = 0; i < nearpolimarker.length; i++) {
      nearpolimarker[i].setMap(null);
    }
    nearpolimarker = [];
  }


  // changing address from coordinates
  var geocoder = new kakao.maps.services.Geocoder();
  var marker = new kakao.maps.Marker({
    clickable: true
  })
  var parkMarkers = [];



  // click event on the map
  kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
    deletemarker();
    delcctvmarkers();
    deleteCircle();
    deleteInnerCircle();
    var content;
    searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        detailAddr = result[0].address.region_2depth_name
        marker.setPosition(mouseEvent.latLng);
        marker.setMap(map);
        createMarkers(result[0].address.region_2depth_name);
        content = '<div class ="label2"><span class="center">' + detailAddr + '</span></div>';
        var position = mouseEvent.latLng;
        delGuName();
        showGuName(content, position);
      }
    });


  });


  // call address
  function searchAddrFromCoords(coords, callback) {
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  }
  function searchDetailAddrFromCoords(coords, callback) {
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  }


  /**----------------circle start------------------**/
  circles = [];
  function drawingCircle(parkmarker) {
    circle = new kakao.maps.Circle({
      center: parkmarker.getPosition(),
      radius: 1700, // m radius
      strokeWeight: 4,
      strokeColor: '#00ffff',
      strokeOpacity: 0.4,
      strokeStyle: 'dashed',
      fillColor: '#1e90ff',
      fillOpacity: 0.2
    });

    circles.push(circle);
    circle.setMap(map);

    kakao.maps.event.addListener(circle, 'mouseover', function (mouseEvent) {
      var position = mouseEvent.latLng;
      var radius = Math.round(circle.getRadius());
      var content = '<div class ="label"><span class="center">' + radius + '</span></div>';
      showDistance(content, position);
    })

    kakao.maps.event.addListener(circle, 'mousemove', function (mouseEvent) {
      var position = mouseEvent.latLng;
      var radius = Math.round(circle.getRadius());
      var content = '<div class ="label"><span class="center">반경: ' + radius + 'm</span></div>';
      showDistance(content, position);
    })

    let delay = 300;
    let timer = null;
    kakao.maps.event.addListener(circle, 'mousemove', function (mouseEvent) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        deleteDistnce();
      }, delay);
    })
  }

  function deleteCircle() {
    circles.forEach(element => {
      element.setMap(null)
    })
  }

  innerCircles = [];
  function drawingInnerCircle(parkmarker) {
    innerCircle = new kakao.maps.Circle({
      center: parkmarker.getPosition(),
      radius: 500,
      strokeWeight: 4,
      strokeColor: '#ffffff',
      strokeOpacity: 0.4,
      strokeStyle: 'dashed',
      fillColor: '#ffffff',
      fillOpacity: 0.6
    });

    innerCircles.push(innerCircle);
    innerCircle.setMap(map);

    kakao.maps.event.addListener(innerCircle, 'mouseover', function (mouseEvent) {
      var position = mouseEvent.latLng;
      var radius = Math.round(innerCircle.getRadius());
      var content = '<div class ="label"><span class="left"></span><span class="center">' + radius + '</span><span class="right"></span></div>';
      showDistance(content, position);
    })

    kakao.maps.event.addListener(innerCircle, 'mousemove', function (mouseEvent) {
      var position = mouseEvent.latLng;
      var radius = Math.round(innerCircle.getRadius());
      var content = '<div class ="label"><span class="center">반경: ' + radius + 'm</span></div>';
      showDistance(content, position);
    })

    let delay = 300;
    let timer = null;
    kakao.maps.event.addListener(innerCircle, 'mousemove', function (mouseEvent) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        deleteDistnce();
      }, delay);
    })
  }

  //delete innercicle
  function deleteInnerCircle() {
    innerCircles.forEach(element => {
      element.setMap(null)
    })
  }

  //disapear circle innercicle radius
  function deleteDistnce() {
    if (distanceOverlay) {
      distanceOverlay.setMap(null);
      distanceOverlay = null;
    }
  }

  //show circle innercircle radius
  function showDistance(content, position) {
    if (distanceOverlay) {
      distanceOverlay.setPosition(position);
      distanceOverlay.setContent(content);
    } else {
      distanceOverlay = new kakao.maps.CustomOverlay({
        map: map,
        content: content,
        position: position,
        xAnchor: 0,
        yAnchor: 1,
        zIndex: 3
      });
    }
  }

  //disapear circle innercicle radius
  function delGuName() {
    if (guNameOverlay) {
      guNameOverlay.setMap(null);
      guNameOverlay = null;
    }
  }




  function showGuName(content, position) {
    if (guNameOverlay) {
      guNameOverlay.setPosition(position);
      guNameOverlay.setContent(content);
    } else {
      guNameOverlay = new kakao.maps.CustomOverlay({
        map: map,
        content: content,
        position: position,
        xAnchor: .5,
        yAnchor: 3,
        zIndex: 3
      });
    }
  }


  /**----------------circle end------------------**/



  /**----------------park marker start------------------**/
  var markerImageSrc = "../img/parkMarker.png";
  function createMarkerImage(src, size, options) {
    var markerImage = new kakao.maps.MarkerImage(src, size, options);
    return markerImage;
  }
  function createMarker(onePark, image) {
    var parkmarker = new kakao.maps.Marker({
      position: onePark.kakaoposition,
      image: image,
      title: onePark.pName,
    });

    kakao.maps.event.addListener(parkmarker, 'click', function () {

      deleteCircle();
      drawingCircle(parkmarker);

      deleteInnerCircle();
      drawingInnerCircle(parkmarker);

      var parkcoord = parkmarker.getPosition();
      deletemarker();
      polimarker(parkcoord);

      delcctvmarkers();
      shownearcctv(parkcoord);

      document.getElementById('p_park').innerText = onePark.pName;  // 공원 정보 나타내는 부분. DOM 이용 park 변수 상단에서 확인가능
      document.getElementById('p_name').innerText = onePark.adminName;  // 공원 정보 나타내는 부분. DOM 이용 park 변수 상단에서 확인가능
      document.getElementById('p_admintel').innerText = onePark.phoneNumber;  // 공원 정보 나타내는 부분. DOM 이용 park 변수 상단에서 확인가능
      document.getElementById('p_list_content').innerText = onePark.content;  // 공원 정보 나타내는 부분. DOM 이용 park 변수 상단에서 확인가능
      document.getElementById('use_refer').innerText = onePark.useRefer;  // 공원 정보 나타내는 부분. DOM 이용 park 변수 상단에서 확인가능
      // document.getElementById('visit_road').innerText = onePark.visitRoad;  // 공원 정보 나타내는 부분. DOM 이용 park 변수 상단에서 확인가능

      document.getElementById('park_police').innerText = nearpolimarker.length;
      document.getElementById('park_cctv').innerText = nearcctvmarkers.length;

    })
    return parkmarker;
  }

  function createMarkers(region) {
    for (var i = 0; i < parkMarkers.length; i++) {
      parkMarkers[i].setMap(null);
    } parkMarkers = [];

    for (var i = 0; i < parks.length; i++) {
      if (parks[i].addr.includes(region)) {
        var imageSize = new kakao.maps.Size(30, 35)
        var markerImage = createMarkerImage(markerImageSrc, imageSize),
          parkmarker = createMarker(parks[i], markerImage);
        parkMarkers.push(parkmarker);
      }
    } setMarkers();
  }

  function setMarkers() {
    for (var i = 0; i < parkMarkers.length; i++) {
      parkMarkers[i].setMap(map);
    }
  }

  /** park marker end **/


  return (
    <React.Fragment>
      <div id="map_container" className="container-fluid">
        <div id="map_box" className="row">
          <div>
            <p id="map_ment1">우리동네 주변의 공원</p>
            <p id="map_ment2">공원정보와 안전 시설물을 볼수 있어요!</p>
            <p id="policeq">경찰서 표시범위 산정기준?</p>
          </div>
          <div id="modalContainer2" className="hidden">
            <div id="modalContent2">
              <p>
                <h2>경찰서 표시범위 산정기준</h2>
                <br />
                <br />
                <h4>
                  ◎ 현장평균도착시간 : 4분 34초<br /> ◎ 평균차량통행속도 : 23.1km/h
                  <br /> ◎ 긴급출동 평균도착시간 내 도달 가능한 거리 : 1.758km
                  <br />
                </h4>
              </p>
            </div>
          </div>

          <div id="park_mapBox" className="col-lg-12 row">
            <div id="map" className="col-lg-12">
              <div id="modal">
                <div className="modal-content">
                  <h5>지도 사용 방법</h5>
                  <br />
                  <p>● 마우스 클릭 위치에 해당하는 자치구의 공원이 표시됩니다.</p>
                  <p>
                    ● 공원을 클릭하면 반경 500m이내의 CCTV 및<br /> 반경 1700m이내의 경찰서가 표시됩니다.
                  </p>
                  <p>&nbsp;&nbsp;(경찰서의 위치는 긴급출동이 가능한 범위를 기준으로 산정하였습니다.)</p>
                  <p>● 지도의 확대 및 축소는 지도 오른쪽 상단의 버튼을 통해서만 가능합니다.</p>
                </div>
              </div>
            </div>

            <div id="park_security">
              <div id="park_securityMent">공원주변의 치안시설 수</div>
              <div className="security_count">
                cctv수 : <span id="park_cctv"></span>
              </div>
              <div className="security_count">
                경찰서 수 : <span id="park_police"></span>
              </div>
            </div>
          </div>

          <div id="park_list" className="col-lg-12">
            <div id="park_information">
              <div className="park_i">
                공원이름 : <span id="p_park"></span>
              </div>
              <div className="park_i">
                관리부서 : <span id="p_name"></span>
              </div>
              <div className="park_i">
                전화번호 : <span id="p_admintel"></span>
              </div>
              <div className="park_i">
                공원정보 : <span id="p_list_content"></span>
              </div>
              <div className="park_i">
                이용정보 : <span id="use_refer"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="map_wrap">
        <div className="custom_zoomcontrol radius_border">
          <span onClick={() => zoomIn()}>
            <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png" alt="확대" />
          </span>{' '}
          <span onClick={() => zoomOut()}>
            <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png" alt="축소" />
          </span>
        </div>
      </div>
      <div id="sidebar">
        <a href="./Index.html" id="home" data-bs-toggle="tooltip"
          data-bs-placement="right" title="홈으로"
          data-bs-custom-class="custom-tooltip" class="fa fa-home"></a> <a
            href="#" id="upsideIcon" data-bs-toggle="tooltip"
            data-bs-placement="right" title="상단으로"
            data-bs-custom-class="custom-tooltip" class="fa-solid fa-chevron-up"></a>
        <a href="#safety_rank" id="upsideIcon" data-bs-toggle="tooltip"
          data-bs-placement="right" title="우리동네 안전체감도 알아보기"
          data-bs-custom-class="custom-tooltip" class="fa-solid fa-award"></a>
        <a href="#map_box" id="mapIcon" data-bs-toggle="tooltip"
          data-bs-placement="right" title="우리동네 공원찾기"
          data-bs-custom-class="custom-tooltip"
          class="fa-solid fa-map-location-dot"></a>
      </div>
    </React.Fragment>
  );
}

export default App;
