import React from 'react';

function HomeSidebar() {
  const groups = ['Madcamp', 'Madcamp'];
  const friends = [
    '윤서진',
    '윤대한',
    '이현서',
    '박규현',
    '김유림',
    '김정희',
    '박준호',
    '진예환',
  ];

  return (
    <aside className="sidebar bg-gray-50 p-6 rounded-xl shadow-lg max-w-sm">
      {/* 그룹 섹션 */}
      <div className="group-section mb-8">
        <h3 className="text-base font-medium text-gray-700 mb-4">Your Groups</h3>
        <ul className="space-y-3">
          {groups.map((group, index) => (
            <li
              key={index}
              className="group-item flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full mr-3 text-sm font-bold">
                {group[0]}
              </div>
              <a
                href={`/group/${group}`}
                className="text-gray-700 text-sm font-medium hover:text-blue-600 transition"
              >
                {group}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* 친구 섹션 */}
      <div className="friends-section">
        <h3 className="text-base font-medium text-gray-700 mb-4">Friends</h3>
        <ul className="space-y-3">
          {friends.map((friend, index) => (
            <li
              key={index}
              className="friend-item flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <img
                src={`https://via.placeholder.com/40`}
                alt={friend}
                className="rounded-full w-8 h-8 mr-3 object-cover"
              />
              <a
                href={`/profile/${friend}`}
                className="text-gray-700 text-sm font-medium hover:text-blue-600 transition"
              >
                {friend}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default HomeSidebar;
