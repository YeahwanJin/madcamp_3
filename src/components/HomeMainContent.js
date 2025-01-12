import React, { useState } from 'react';

function HomeMainContent() {
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    {
      id: 1,
      date: 'MAY 08',
      title: '프랑스 여행',
      description: '에펠탑 야경 정말 아름답다. 모두에게 프랑스 여행 추천!',
      image: 'https://via.placeholder.com/300x200',
      comments: ['대박 멋짐', '잘생겼네요!', '와우~ 패리 크라이너!! 멋진 걸~'],
    },
    {
      id: 2,
      date: 'JAN 17',
      title: 'Meta Korea',
      description: 'Meta Korea 관련 최신 소식.',
      image: 'https://via.placeholder.com/300x200',
      comments: ['최고네요!', 'Meta 정말 빠르네요.', '커피 한 잔 가능할까요?'],
    },
  ];

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  return (
    <main className="main-content bg-gray-50 p-4 rounded-lg shadow-md">
      {/* 피드 목록 */}
      {posts.map((post) => (
        <div
          key={post.id}
          className="post-card bg-white rounded-lg shadow-sm p-4 mb-4 cursor-pointer hover:bg-gray-100"
          onClick={() => handlePostClick(post)}
        >
          <div className="flex items-start">
            <img
              src={post.image}
              alt={post.title}
              className="rounded-lg w-40 h-28 object-cover mr-4"
            />
            <div>
              <div className="text-blue-500 text-xs font-bold">{post.date}</div>
              <h4 className="font-bold text-lg">{post.title}</h4>
              <p className="text-gray-600 text-sm truncate">{post.description}</p>
            </div>
          </div>
        </div>
      ))}

      {/* 모달 */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal} // 배경 클릭 시 모달 닫기
        >
          {/* 모달 콘텐츠 */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative"
            onClick={(e) => e.stopPropagation()} // 내부 클릭은 이벤트 전파 방지
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <div className="flex">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="rounded-lg w-1/3 h-auto mr-4"
              />
              <div>
                <h4 className="text-xl font-bold">{selectedPost.title}</h4>
                <p className="text-gray-500 mb-4">{selectedPost.date}</p>
                <p>{selectedPost.description}</p>
              </div>
            </div>
            <div className="mt-6">
              <h5 className="text-lg font-bold mb-2">Comments</h5>
              <ul>
                {selectedPost.comments.map((comment, index) => (
                  <li key={index} className="mb-2 p-2 bg-gray-100 rounded">
                    {comment}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default HomeMainContent;
