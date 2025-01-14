import React, { useState } from 'react';
import axios from 'axios';

function ProfileShowOff({ onClose }) {
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState({
    image: null,
    title: '',
  });
  const defaultImage =
    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" stroke="%23ccc" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 11l2.5 3L16 8"/><circle cx="15.5" cy="8.5" r="0.5"/></svg>';

    const handleUpload = async () => {
      if (!newAchievement.title) {
        alert('제목을 입력하세요!');
        return;
      }
    
      // FormData 객체를 생성하여 파일과 기타 필드 데이터를 포함시킵니다.
      const formData = new FormData();
      formData.append('title', newAchievement.title);
      if (newAchievement.image) {
        formData.append('image', newAchievement.image);
      }
    
      try {
        // 서버에 POST 요청을 보내서 새로운 Achievement를 생성합니다.
        const response = await axios.post('http://172.10.7.49:5000/api/achievements', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        // 새로운 Achievement를 로컬 상태에 추가합니다.
        setAchievements([...achievements, response.data.achievement]);
    
        // 입력 필드를 초기화합니다.
        setNewAchievement({ image: null, title: '' });
    
      } catch (error) {
        console.error('Achievement upload failed:', error);
        alert('업로드에 실패했습니다. 다시 시도해 주세요.');
      }
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-2/3 relative">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✖
        </button>

        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">자랑하기</h3>

        {/* 업로드 섹션 */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold mb-4 text-gray-700">새로운 자랑 추가</h4>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              className="block w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              onChange={(e) =>
                setNewAchievement({ ...newAchievement, image: e.target.files[0] })
              }
            />
            <input
              type="text"
              placeholder="제목 입력"
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={newAchievement.title}
              onChange={(e) =>
                setNewAchievement({ ...newAchievement, title: e.target.value })
              }
            />
            <button
              onClick={handleUpload}
              className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              업로드
            </button>
          </div>
        </div>

        {/* 업로드된 자랑 목록 */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-700">자랑 목록</h4>
          <div
            className="grid grid-cols-5 gap-6 max-h-96 overflow-y-auto"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#cfcfcf transparent' }}
          >
            {achievements.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="mt-2 text-sm text-center text-gray-600">{item.title}</p>
              </div>
            ))}
            {[...Array(15 - achievements.length)].map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileShowOff;
