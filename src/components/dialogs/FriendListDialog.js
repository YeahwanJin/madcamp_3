import React from 'react';

// 더미 친구 데이터
const friends = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

function FriendListDialog({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm">
        {/* 헤더 */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          친구 목록
        </h2>

        {/* 친구 목록 */}
        <ul className="space-y-4">
          {friends.map((friend) => (
            <li
              key={friend.id}
              className="p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="text-gray-700 font-medium text-center">
                {friend.name}
              </div>
            </li>
          ))}
        </ul>

        {/* 닫기 버튼 */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default FriendListDialog;

