import React, { useState } from 'react';

function ProfileEditDialog({ onClose }) {
  const [bio, setBio] = useState('');
  const [tags, setTags] = useState('');

  const handleSave = () => {
    console.log('Bio:', bio);
    console.log('Tags:', tags.split(','));
    onClose(); // 다이얼로그 닫기
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">프로필 편집</h2>
        <textarea
          className="w-full p-2 border rounded mb-4"
          placeholder="자기 소개를 입력하세요"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="관심사를 콤마로 구분하여 입력하세요"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditDialog;
