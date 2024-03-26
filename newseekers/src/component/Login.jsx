import '../css/login.css';
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // 서버로 로그인 요청을 보냅니다.
            const response = await fetch('/newseekers/member/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userId, user_pw: userPw }),
            });

            if (!response.ok) {
                throw new Error('로그인에 실패했습니다.');
            }

            // 로그인이 성공한 경우
            // onLogin 함수를 호출하여 로그인 상태를 변경합니다.
            onLogin();
        } catch (error) {
            // 로그인이 실패한 경우
            setError(error.message); // 오류 메시지를 설정합니다.
        }
    };

    return (
        <div id="login_container">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <form onSubmit={handleSubmit} name="reg_frm">
                        <h1 className="text-center fw-bold mb-7" id="logo">NewSeekers</h1>
                        <br /><br />
                        <div className="form-group mb-3">
                            <input type="text" placeholder="아이디" value={userId} onChange={(e) => setUserId(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-group mb-3">
                            <input type="password" placeholder="비밀번호" value={userPw} onChange={(e) => setUserPw(e.target.value)} className="form-control" />
                        </div>
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}
                        <div className="logIn d-flex flex-column text-center">
                            <button type="submit" className="btn btn-primary mb-2">로그인</button>
                            <input type="button" className="btn btn-primary mb-2" value="회원가입" onClick={() => window.location = '/newseekers/member/join'} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
