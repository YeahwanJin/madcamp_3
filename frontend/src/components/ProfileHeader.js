import React, { useState } from 'react';
import ProfileShowOff from './ProfileShowOff';
import ProfileEditDialog from './dialogs/ProfileEditDialog';
import UploadDialog from './dialogs/UploadDialog';
import FriendListDialog from './dialogs/FriendListDialog';

function ProfileHeader({ user }) {
  const [showShowOffModal, setShowShowOffModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFriendListModal, setShowFriendListModal] = useState(false);

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <img
          src={user.profileImage || 'https://via.placeholder.com/150'}
          alt={user.name}
          className="w-24 h-24 rounded-full mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500">{user.intro}</p>
        </div>
      </div>

      {/* 버튼들 */}
      <div className="flex space-x-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowShowOffModal(true)}
        >
          자랑
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setShowUploadModal(true)}
        >
          업로드
        </button>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded"
          onClick={() => setShowFriendListModal(true)}
        >
          친구 보기
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          onClick={() => setShowEditModal(true)}
        >
          프로필 편집
        </button>
      </div>

      {/* 모달 컴포넌트 */}
      {showShowOffModal && <ProfileShowOff onClose={() => setShowShowOffModal(false)} />}
      {showEditModal && <ProfileEditDialog onClose={() => setShowEditModal(false)} />}
      {showUploadModal && <UploadDialog onClose={() => setShowUploadModal(false)} />}
      {showFriendListModal && <FriendListDialog onClose={() => setShowFriendListModal(false)} />}
    </div>
  );
}

export default ProfileHeader;
