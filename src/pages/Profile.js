import React, { useState, useEffect } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import ProfileGroupList from '../components/ProfileGroupList';
import ProfileTagList from '../components/ProfileTagList';
import CoffeeIcon from '../assets/buttons/ph_coffee-bold.svg';
import LoveIcon from '../assets/buttons/mingcute_love-line.svg';
import ChatIcon from '../assets/buttons/ph_chat-bold.svg';
import axios from 'axios';

function Profile({ currentUser }) {
  const [userProfile, setUserProfile] = useState({
    name: '',
    intro: 'No introduction provided',
    profileImage: null,
    tags: [],
    groups: []
  });

  console.log('userprofile:', userProfile);

  const [uploads, setUploads] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [buttonStates, setButtonStates] = useState({
    coffeeClicked: false,
    loveClicked: false,
    chatClicked: false,
  });

  // 프로필 업데이트 시 userProfile 상태 업데이트
  const handleProfileUpdate = (updatedProfile) => {
    setUserProfile(prev => ({
      ...prev,
      name: updatedProfile.name,
      intro: updatedProfile.bio,
      tags: updatedProfile.tags,
      profileImage: updatedProfile.image instanceof File 
        ? URL.createObjectURL(updatedProfile.image)
        : updatedProfile.image
    }));
    
  };

  // 메모리 누수 방지를 위한 URL 객체 정리
  useEffect(() => {
    async function fetchUserProfile() {
      if (currentUser?.id) {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/${currentUser.id}/profile`);
          if (response.data) {
            setUserProfile({
              name: response.data.name,
              intro: response.data.intro,
              profileImage: response.data.profileImage,
              tags: Array.isArray(response.data.tags) ? response.data.tags : [],
              groups: Array.isArray(response.data.groups) ? response.data.groups : [],
            });
          }
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          // 여기서 적절한 에러 처리를 구현
        }
      }
    }

    fetchUserProfile();
    
  }, [currentUser.id]);  // currentUser.id 변경시 호출

  const handleUpload = (newUpload) => {
    setUploads(prevUploads => [...prevUploads, newUpload]);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setComments([]);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    setComments(prevComments => [...prevComments, newComment]);
    setNewComment('');
  };

  const toggleButtonState = (buttonKey) => {
    setButtonStates(prevStates => ({
      ...prevStates,
      [buttonKey]: !prevStates[buttonKey],
    }));
  };

  if (!currentUser) {
    return <p className="text-center text-red-500 text-lg">로그인되지 않았습니다. 로그인해주세요.</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row bg-gradient-to-r from-gray-100 to-gray-50 min-h-screen p-8 gap-6">
      {/* 왼쪽 사이드바 */}
      <aside className="lg:w-1/4 space-y-6 bg-white p-6 rounded-2xl shadow-xl">
        {/*<ProfileGroupList groups={userProfile.groups} />*/}
        {/*<ProfileTagList tags={userProfile.tags} />*/}
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="lg:w-3/4 flex flex-col bg-white p-8 rounded-2xl shadow-xl">
      
        <ProfileHeader
          user={userProfile}
          onUpload={handleUpload}
          onProfileUpdate={handleProfileUpdate}
        />

        {/* 업로드된 게시물 섹션 */}
        <section className="mt-8">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">게시물</h3>
          {uploads.length === 0 ? (
            <p className="text-gray-500 text-lg">업로드된 게시물이 없습니다.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {uploads.map((upload, index) => (
                <div
                  key={index}
                  className="cursor-pointer group hover:shadow-lg transition duration-300 ease-in-out rounded-lg overflow-hidden"
                  onClick={() => handlePostClick(upload)}
                >
                  <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={upload.image || 'https://via.placeholder.com/150'}
                      alt={`업로드-${index}`}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 게시물 상세 모달 */}
        {selectedPost && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-3xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
              >
                ✕
              </button>

              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/2">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full rounded-xl shadow-md"
                  />
                </div>

                <div className="lg:w-1/2">
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">{selectedPost.title}</h4>
                  <p className="text-sm text-gray-500 mb-4">{selectedPost.date}</p>
                  <p className="text-gray-700 mb-4">{selectedPost.content}</p>
                  <div className="space-x-2">
                    {selectedPost.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block text-blue-500 text-xl"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 인터랙션 버튼 */}
              <div className="flex justify-center mt-8 space-x-6">
                <button
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition transform hover:scale-110 ${
                    buttonStates.coffeeClicked ? 'bg-orange-500' : 'bg-gray-200'
                  }`}
                  onClick={() => toggleButtonState('coffeeClicked')}
                >
                  <img src={CoffeeIcon} alt="커피" className="w-6 h-6" />
                </button>
                <button
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition transform hover:scale-110 ${
                    buttonStates.loveClicked ? 'bg-red-500' : 'bg-gray-200'
                  }`}
                  onClick={() => toggleButtonState('loveClicked')}
                >
                  <img src={LoveIcon} alt="사랑" className="w-6 h-6" />
                </button>
                <button
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition transform hover:scale-110 ${
                    buttonStates.chatClicked ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                  onClick={() => toggleButtonState('chatClicked')}
                >
                  <img src={ChatIcon} alt="채팅" className="w-6 h-6" />
                </button>
              </div>

              {/* 댓글 섹션 */}
              <div className="mt-8">
                <h5 className="text-xl font-semibold text-gray-800 mb-4">댓글</h5>
                <ul className="space-y-4 max-h-60 overflow-y-auto">
                  {comments.map((comment, index) => (
                    <li
                      key={index}
                      className="bg-gray-50 p-4 rounded-xl shadow-sm"
                    >
                      {comment}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요..."
                    className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleCommentSubmit}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    등록
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Profile;