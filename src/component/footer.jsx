import '../css/header.footer.css';
import React from 'react';

function Footer() {
    return (
        <footer id="footer_container">
            <div id="footer_box">
                <div id="footer_address">
                    <ul>
                        <li>서울시 마포구 신촌로 176 중앙빌딩</li>
                        <li>대표전화 02-123-1234</li>
                        <li>대표메일 abc@abc.com</li>
                    </ul>
                </div>
                <div id="footer_info">
                    <div>개인정보처리방침</div>
                    <div>이메일 무단수집 거부</div>
                    <div>이용약관</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
