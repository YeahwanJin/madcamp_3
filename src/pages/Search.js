import React, { useState } from 'react';

// 더미 데이터 (검색 결과 예제)
const dummyData = [
  { id: 1, name: 'Madcamp', icon: '목표' },
  { id: 2, name: 'Madcamp', icon: '목표' },
  { id: 3, name: 'Madcamp', icon: '목표' },
  { id: 4, name: 'Madcamp', icon: '목표' },
  { id: 5, name: 'Madcamp', icon: '목표' },
];

function Search() {
  const [searchName, setSearchName] = useState('');
  const [searchTag, setSearchTag] = useState('');

  // 검색 필터
  const filteredResults = dummyData.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(searchName.toLowerCase());
    const tagMatch = item.icon.toLowerCase().includes(searchTag.toLowerCase());
    return nameMatch || tagMatch;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      {/* 검색 필드 */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="이름 검색"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="태그 검색"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
          />
        </div>
      </div>

      {/* 검색 결과 */}
      <div className="mt-6 bg-white rounded-lg shadow-lg p-4">
        {filteredResults.map((item) => (
          <div
            key={item.id}
            className="flex items-center p-3 border-b last:border-none hover:bg-gray-100 transition"
          >
            <div className="w-10 h-10 flex justify-center items-center bg-gray-200 rounded-full">
              {item.icon}
            </div>
            <div className="ml-4 text-lg font-medium">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
