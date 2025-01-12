import React from 'react';

// 더미 친구 데이터
const friends = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

function FriendListDialog({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">친구 목록</h2>
        <ul className="space-y-2">
          {friends.map((friend) => (
            <li key={friend.id} className="p-2 border rounded">
              {friend.name}
            </li>
          ))}
        </ul>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default FriendListDialog;
