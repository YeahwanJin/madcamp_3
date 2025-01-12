import React, { useState } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import ProfileGroupList from '../components/ProfileGroupList';
import ProfileTagList from '../components/ProfileTagList';
import ProfileImageGrid from '../components/ProfileImageGrid';

function Profile({ currentUser }) {
  if (!currentUser) {
    return <p>로그인되지 않았습니다. 로그인해주세요.</p>;
  }
  
  const { username, profileInfo } = currentUser;

  // 기본값 설정
  const groups = profileInfo?.groups || ['Default Group 1', 'Default Group 2'];
  const tags = profileInfo?.tags || ['default-tag1', 'default-tag2'];
  const images = profileInfo?.images || [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen p-6">
      {/* 왼쪽 사이드바 */}
      <div className="w-1/4">
        <ProfileGroupList groups={groups} />
        <ProfileTagList tags={tags} />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="w-3/4 bg-white p-6 rounded-lg shadow-md">
        <ProfileHeader id={currentUser.id} />
        {/* 이미지 그리드 */}
        <ProfileImageGrid images={images} />
      </div>
    </div>
  );
}

export default Profile;
