import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// SVG 파일을 import
import HomeIcon from '../assets/buttons/tdesign_home.svg';
import ProfileIcon from '../assets/buttons/pajamas_profile.svg';
import SearchIcon from '../assets/buttons/Search.svg';


function Header({ onLogout }) {
  const navigate = useNavigate();

  // 로그아웃 핸들러
  const handleLogout = () => {
    if (onLogout) {
      onLogout(); // 부모(App.js)에서 전달받은 로그아웃 함수 호출
    }
    navigate('/login'); // 로그인 페이지로 이동
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md flex justify-between items-center">
      {/* 로고 및 제목 */}
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">My SNS</h1>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className="flex items-center space-x-6">
        <Link to="/">
          <img
            src={HomeIcon}
            alt="Home"
            className="w-6 h-6 hover:opacity-80 transition duration-150"
          />
        </Link>
        <Link to="/profile">
          <img
            src={ProfileIcon}
            alt="Profile"
            className="w-6 h-6 hover:opacity-80 transition duration-150"
          />
        </Link>
        <Link to="/search">
          <img
            src={SearchIcon}
            alt="Search"
            className="w-6 h-6 hover:opacity-80 transition duration-150"
          />
        </Link>
      </nav>

      {/* 로그아웃 버튼 */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
      >
        Logout
      </button>
    </header>
  );
}

export default Header;

