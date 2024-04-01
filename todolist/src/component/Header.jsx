import React from 'react';
import '../css/Header.css';

const Header = () => {
    console.log("Header 업데이트"); //리벤더 될때마다 콘솔에 출력
    return (
        <div className="Header">
            <h3>오늘은 📅</h3>
            <h1>{new Date().toDateString()}</h1>
        </div>
    );
};
export default React.memo(Header); //메모이제이션 적용