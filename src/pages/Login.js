import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios import

function Login({ setAuthStatus }) {
  const navigate = useNavigate(); // 페이지 이동을 위한 React Router Hook

  // 로그인 및 회원가입 상태 관리
  const [userInfo, setUserInfo] = useState({ username: '', password: '' }); // 로그인 상태
  const [signupInfo, setSignupInfo] = useState({ username: '', password: '' }); // 회원가입 상태
  const [isDialogOpen, setIsDialogOpen] = useState(false); // 회원가입 다이얼로그 열림 상태
  const [message, setMessage] = useState(''); // 사용자 메시지 표시

  // Axios 기본 설정 (필요시)
  const axiosInstance = axios.create({
    baseURL: 'http://172.10.7.49:5000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 로그인 처리 함수 (Axios 사용)
  const handleLogin = async () => {
    if (!userInfo.username || !userInfo.password) {
      setMessage('Please fill in both username and password.');
      return;
    }

    try {
      const response = await axiosInstance.post('/login', {
        username: userInfo.username,
        password: userInfo.password,
      });

      // 로그인 성공
      setMessage('Login Successful!');
      setAuthStatus(true); // 인증 상태 변경 (부모 컴포넌트에 전달)
      localStorage.setItem('currentUser', JSON.stringify(response.data)); // 현재 사용자 저장
      console.log('저장된 currentUser:', localStorage.getItem('currentUser')); // 저장된 데이터 확인
      navigate('/'); // 홈 화면으로 이동
    } catch (error) {
      // 로그인 실패
      setMessage(error.response?.data?.error || 'Login failed.');
      console.error('Login error:', error);
    }
  };

  // 회원가입 처리 함수 (Axios 사용)
  const handleSignup = async () => {
    if (!signupInfo.username || !signupInfo.password) {
      setMessage('Please fill in both username and password.');
      return;
    }

    try {
      const response = await axiosInstance.post('/register', {
        username: signupInfo.username,
        password: signupInfo.password,
      });

      // 회원가입 성공
      setMessage('Signup Successful!');
      setSignupInfo({ username: '', password: '' }); // 입력 초기화
      setIsDialogOpen(false); // 다이얼로그 닫기
    } catch (error) {
      // 회원가입 실패
      setMessage(error.response?.data?.error || 'Signup failed.');
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">Login</h1>
      <div className="w-80 bg-white p-6 shadow rounded">
        {/* 사용자 이름 입력 */}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded mb-4"
          value={userInfo.username}
          onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
        />
        {/* 비밀번호 입력 */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={userInfo.password}
          onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
        />
        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
        {/* 회원가입 버튼 */}
        <button
          onClick={() => setIsDialogOpen(true)}
          className="w-full bg-gray-500 text-white py-2 rounded mt-2 hover:bg-gray-700 transition"
        >
          Sign Up
        </button>
        {/* 메시지 출력 */}
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>

      {/* 회원가입 다이얼로그 */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 shadow rounded w-80">
            <h2 className="text-lg font-bold mb-4">Sign Up</h2>
            {/* 회원가입 사용자 이름 입력 */}
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded mb-4"
              value={signupInfo.username}
              onChange={(e) => setSignupInfo({ ...signupInfo, username: e.target.value })}
            />
            {/* 회원가입 비밀번호 입력 */}
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded mb-4"
              value={signupInfo.password}
              onChange={(e) => setSignupInfo({ ...signupInfo, password: e.target.value })}
            />
            {/* 회원가입 버튼 */}
            <button
              onClick={handleSignup}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
            {/* 회원가입 취소 버튼 */}
            <button
              onClick={() => setIsDialogOpen(false)}
              className="w-full bg-gray-500 text-white py-2 rounded mt-2 hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;