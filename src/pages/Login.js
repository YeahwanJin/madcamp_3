import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setAuthStatus }) {
  const navigate = useNavigate();

  // State for login and signup
  const [userInfo, setUserInfo] = useState({ username: '', password: '' });
  const [signupInfo, setSignupInfo] = useState({ username: '', password: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load registered users from localStorage
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    setRegisteredUsers(users);
  }, []);

  // 로그인 처리
  const handleLogin = () => {
    if (!userInfo.username || !userInfo.password) {
      alert('Please fill in both username and password.');
      return;
    }

    const user = registeredUsers.find(
      (user) =>
        user.username === userInfo.username && user.password === userInfo.password
    );

    if (user) {
      alert('Login Successful!');
      setAuthStatus(true); // 인증 상태 변경
      localStorage.setItem('currentUser', JSON.stringify(user)); // 현재 사용자 저장
      navigate('/'); // 홈 화면으로 이동
    } else {
      alert('Invalid username or password');
    }
  };

  // 회원가입 처리
  const handleSignup = () => {
    if (!signupInfo.username || !signupInfo.password) {
      alert('Please fill in both username and password.');
      return;
    }

    if (registeredUsers.some((user) => user.username === signupInfo.username)) {
      alert('Username already exists.');
      return;
    }

    const newUser = { ...signupInfo };
    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers)); // localStorage에 저장
    setSignupInfo({ username: '', password: '' });
    setIsDialogOpen(false);
    alert('Signup Successful!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">Login</h1>
      <div className="w-80 bg-white p-6 shadow rounded">
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded mb-4"
          value={userInfo.username}
          onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={userInfo.password}
          onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="w-full bg-gray-500 text-white py-2 rounded mt-2 hover:bg-gray-700 transition"
        >
          Sign Up
        </button>
      </div>

      {/* 회원가입 다이얼로그 */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 shadow rounded w-80">
            <h2 className="text-lg font-bold mb-4">Sign Up</h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded mb-4"
              value={signupInfo.username}
              onChange={(e) => setSignupInfo({ ...signupInfo, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded mb-4"
              value={signupInfo.password}
              onChange={(e) => setSignupInfo({ ...signupInfo, password: e.target.value })}
            />
            <button
              onClick={handleSignup}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
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
