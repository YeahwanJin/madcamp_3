// src/utils/userService.js

// 모든 사용자 정보 가져오기
export const getAllUsers = () => {
    return JSON.parse(localStorage.getItem('users')) || {};
};
  
  // 특정 사용자 정보 가져오기
export const getUser = (username) => {
    const users = getAllUsers();
    return users[username] || null;
};
  
  // 사용자 정보 저장
export const saveUser = (user) => {
    const users = getAllUsers();
    users[user.username] = user; // 기존 사용자 업데이트 또는 새 사용자 추가
    localStorage.setItem('users', JSON.stringify(users));
};
  
  // 현재 로그인한 사용자 저장
export const setCurrentUser = (username) => {
    localStorage.setItem('currentUser', username);
};
  
  // 현재 로그인한 사용자 가져오기
export const getCurrentUser = () => {
    const username = localStorage.getItem('currentUser');
    return getUser(username);
};
  
  // 로그아웃
export const logout = () => {
    localStorage.removeItem('currentUser');
};
  