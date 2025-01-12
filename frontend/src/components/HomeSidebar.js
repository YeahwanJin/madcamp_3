import React from 'react';
import '../css/Home_Sidebar.css';

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
    <aside className="sidebar bg-white p-4 rounded-lg shadow-md">
      {/* 그룹 섹션 */}
      <div className="group-section mb-6">
        <h3 className="text-gray-500 text-sm font-bold mb-2">Your GROUP</h3>
        <ul>
          {groups.map((group, index) => (
            <li
              key={index}
              className="mb-2 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              {/* 네모칸 전체를 클릭 가능하게 변경 */}
              <a
                href={`/group/${group}`}
                className="flex items-center p-2"
              >
                <div className="bg-gray-300 rounded-full w-8 h-8 flex justify-center items-center text-sm font-bold text-white mr-2">
                  {group[0]}
                </div>
                <span className="text-blue-500">{group}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* 친구 섹션 */}
      <div className="friends-section">
        <h3 className="text-gray-500 text-sm font-bold mb-2">FRIENDS</h3>
        <ul>
          {friends.map((friend, index) => (
            <li
              key={index}
              className="mb-2 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              {/* 네모칸 전체를 클릭 가능하게 변경 */}
              <a
                href={`/profile/${friend}`}
                className="flex items-center p-2"
              >
                <img
                  src={`https://via.placeholder.com/40`}
                  alt={friend}
                  className="rounded-full w-8 h-8 mr-2"
                />
                <span className="text-blue-500">{friend}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default HomeSidebar;

