import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Header from './components/Header';
import { getCurrentUser, setCurrentUser, logout } from './utils/userService';

function App() {
  // 현재 로그인한 사용자 상태 관리
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setAuthStatus] = useState(false);

  // 애플리케이션 로드 시 현재 로그인된 사용자 설정
  //서버로부터 받은 사용자 정보를 setCurrentUser 함수를 사용하여 currentUser 상태에 저장
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setCurrentUser(user);
        setAuthStatus(true);
      } else {
        setAuthStatus(false);
      }
    };
    fetchUser();
  }, []);

  // 로그아웃 핸들러
  const handleLogout = () => {
    logout(); // 사용자 로그아웃 처리
    setCurrentUser(null); // 상태 초기화
  };

  return (
    <Router>
      {/* Header는 로그인 상태일 때만 렌더링 */}
      {currentUser && <Header onLogout={handleLogout} />}
      <Routes>
        {/* 홈 화면 */}
        <Route
          path="/"
          element={currentUser ? <Home currentUser={currentUser} /> : <Navigate to="/login" />}
        />
        {/* 로그인 화면 */}
        <Route
          path="/login"
          element={<Login setCurrentUser={setCurrentUser} setAuthStatus={setAuthStatus} />}
        />
        {/* 프로필 화면 */}
        <Route
          path="/profile"
          element={currentUser ? <Profile currentUser={currentUser} /> : <Navigate to="/login" />}
        />
        {/* 검색 화면 */}
        <Route
          path="/search"
          element={currentUser ? <Search currentUser={currentUser} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
