import '../css/header.footer.css';
import '../css/login.css';
import React, { useState } from 'react';
import logo from '../img/1logo.png';
import Login from './Login'; // 로그인 폼 컴포넌트 import

const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('user_id') !== null);

    // const handleLogin = () => {
    //     // 로그인 로직을 처리한 후에
    //     // 로그인이 성공하면 setLoggedIn(true)를 호출하여 loggedIn 상태를 변경합니다.
    //     setLoggedIn(true);
    // };

    return (
        <div className="headbar fixed-top">
            <nav className="navbar navbar-expand-md">
                <div id="logo">
                    <a href="/newseekers/"><img src={logo} alt="" /></a>
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navMenu" aria-controls="navMenu"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navMenu">
                    <ul className="navbar-nav lg-2">
                        <li className="nav-item"><a className="nav-link active"
                            aria-current="page" href="./seoul_main.jsp">
                            <p>서울시 안전지도</p>
                        </a></li>
                        <li className="nav-item"><a className="nav-link" href="/newseekers/borough/borough_saftyInfo">
                            <p>우리동네 돋보기</p>
                        </a></li>
                        <li className="nav-item"><a className="nav-link" href="../preview.jsp">
                            <p>예측서비스</p>
                        </a></li>
                        <li className="nav-item"><a className="nav-link"
                            href="/newseekers/board/list?page=1">
                            <p>커뮤니티</p>
                        </a></li>
                        {/* 세션 체크 */}
                        <li className="nav-item">
                            {loggedIn ? (
                                // 사용자가 로그인한 경우
                                <a className="nav-link" id="myPageButton" data-bs-toggle="modal"
                                    data-bs-target="#myPageModal"><p>마이페이지</p>
                                </a>

                            ) : (
                                // 로그인하지 않은 경우
                                <a className="nav-link" href="/newseekers/member//login">
                                    <p>로그인</p>
                                </a>

                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
