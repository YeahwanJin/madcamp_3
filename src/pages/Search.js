import React, { useState } from 'react';

// 더미 데이터 (검색 결과 예제)
const dummyData = [
  { id: 1, name: 'Madcamp', icon: '🎯' },
  { id: 2, name: 'ReactCamp', icon: '🚀' },
  { id: 3, name: 'JavaCamp', icon: '☕' },
  { id: 4, name: 'CodeCamp', icon: '💻' },
  { id: 5, name: 'DesignCamp', icon: '🎨' },
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
    <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Search</h1>

      {/* 검색 필드 */}
      <div className="space-y-6">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="이름 검색"
            className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="태그 검색"
            className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
          />
        </div>
      </div>

      {/* 검색 결과 */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        {filteredResults.length > 0 ? (
          filteredResults.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-4 border-b last:border-none hover:bg-gray-100 rounded-lg transition cursor-pointer"
            >
              <div className="w-12 h-12 flex justify-center items-center bg-blue-500 text-white rounded-full text-xl font-bold shadow-md">
                {item.icon}
              </div>
              <div className="ml-6 text-lg font-medium text-gray-800">{item.name}</div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default Search;
