import React from 'react';

function ProfileShowOff({ onClose }) {
  const achievements = [
    { image: 'https://via.placeholder.com/50', title: '카이스트 박사' },
    { image: 'https://via.placeholder.com/50', title: 'UDT 공역' },
    { image: 'https://via.placeholder.com/50', title: '메타 코리아 제국' },
    { image: 'https://via.placeholder.com/50', title: '운전면허 1종 보통' },
    { image: 'https://via.placeholder.com/50', title: '한식 조리기능사 자격증' },
    { image: 'https://via.placeholder.com/50', title: '태권도 1급' },
    { image: 'https://via.placeholder.com/50', title: '뉴욕대 교환' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✖
        </button>
        <h3 className="text-xl font-bold mb-4 text-center">자랑하기</h3>
        <div className="grid grid-cols-4 gap-4">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow"
            >
              <img src={item.image} alt={item.title} className="w-16 h-16 mb-2" />
              <span className="text-sm text-center">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileShowOff;
