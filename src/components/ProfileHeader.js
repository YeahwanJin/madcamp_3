import React, { useState, useEffect } from 'react';
import ProfileShowOff from './ProfileShowOff';
import ProfileEditDialog from './dialogs/ProfileEditDialog';
import UploadDialog from './dialogs/UploadDialog';
import FriendListDialog from './dialogs/FriendListDialog';
import axios from 'axios';

function ProfileHeader({ user, onUpload = () => {}, onProfileUpdate = () => {} }) {
  const [currentUser, setCurrentUser] = useState(user);
  const [showShowOffModal, setShowShowOffModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFriendListModal, setShowFriendListModal] = useState(false);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  //프로필 수정
  const handleProfileUpdate = async (updatedProfile) => {
    try {
      const formData = new FormData();
      formData.append('name', updatedProfile.name);
      formData.append('bio', updatedProfile.bio);
      if (updatedProfile.image instanceof File) {
        formData.append('profileImage', updatedProfile.image, updatedProfile.image.name);
      } else {
        formData.append('profileImage', updatedProfile.image);
      }
      formData.append('tags', JSON.stringify(updatedProfile.tags));
      console.log(user);
  
      const response = await axios.put(`http://172.10.7.49:5000/api/users/${user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

  
      if (response.status === 200) {
        console.log('Profile update successful:', response.data);
        setCurrentUser(response.data);  // Update local state to reflect changes
        setShowEditModal(false);  // Close modal on success
        onProfileUpdate(response.data); // Invoke callback to inform parent components
      }
    } catch (error) {
      console.error('Profile update failed:', error);
      alert('Failed to update profile');
    }
  };
  //글 업로드(500)
  const handleUpload = async (newPost) => {
    try {
      // FormData 객체를 생성하여 파일과 다른 필드를 함께 전송
      const formData = new FormData();
      formData.append('title', newPost.title);
      formData.append('content', newPost.content);
      formData.append('user_id', user.id);  // 사용자 ID를 포함시킵니다
      if (newPost.image) {
        formData.append('image_url', newPost.image);
      }
      formData.append('tags', JSON.stringify(newPost.tags)); // 태그는 JSON 문자열로 전송
      formData.append('date', newPost.date); // 날짜 데이터

      // Axios를 사용하여 POST 요청을 보냅니다
      const response = await axios.post('http://172.10.7.49:5000/posts', formData);

      if (response.status === 201) {
        console.log('Upload successful:', response.data);
        setShowUploadModal(false);  // 업로드 성공 시 모달 닫기
        onUpload(response.data.post); // 상위 컴포넌트에 업로드된 게시물 정보 전달
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };
;
  return (
    <div className="flex items-center justify-between mb-6 p-6 bg-white rounded-xl shadow-md">
      {/* 프로필 정보 */}
      <div className="flex items-center">
        <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-md border border-gray-300">
          <img
            src={currentUser.profileImage || 'https://via.placeholder.com/150'}
            alt="프로필 사진"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="ml-6">
          <h2 className="text-2xl font-semibold text-gray-800">{currentUser.name || '기본 이름'}</h2>
          <p className="text-gray-500 mt-2">{currentUser.intro || '자기소개를 입력하세요.'}</p>
        </div>
      </div>

      {/* 버튼들 */}
      <div className="flex space-x-3">
        <button
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 shadow-sm transition"
          onClick={() => setShowShowOffModal(true)}
        >
          자랑
        </button>
        <button
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 shadow-sm transition"
          onClick={() => setShowUploadModal(true)}
        >
          업로드
        </button>
        <button
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 shadow-sm transition"
          onClick={() => setShowFriendListModal(true)}
        >
          친구 보기
        </button>
        <button
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 shadow-sm transition"
          onClick={() => setShowEditModal(true)}
        >
          프로필 편집
        </button>
      </div>

      {/* 모달 컴포넌트들 */}
      {showShowOffModal && (
        <ProfileShowOff onClose={() => setShowShowOffModal(false)} />
      )}
      {showEditModal && (
        <ProfileEditDialog
          onClose={() => setShowEditModal(false)}
          onSave={handleProfileUpdate}
          initialBio={currentUser.intro || ''}
          initialTags={currentUser.tags ? currentUser.tags.join(', ') : ''}
          initialImage={currentUser.profileImage}
        />
      )}
      {showUploadModal && (
        <UploadDialog
          onClose={() => setShowUploadModal(false)}
          onSave={handleUpload}
        />
      )}
      {showFriendListModal && (
        <FriendListDialog onClose={() => setShowFriendListModal(false)} />
      )}
    </div>
  );
}

export default ProfileHeader;
