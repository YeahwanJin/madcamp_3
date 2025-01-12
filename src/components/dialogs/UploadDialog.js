import React, { useState } from 'react';

function UploadDialog({ onClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);

  const handleSave = () => {
    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Date:', date);
    console.log('Tags:', tags.split(','));
    console.log('Image:', image);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">게시물 업로드</h2>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded mb-4"
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="date"
          className="w-full p-2 border rounded mb-4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="태그를 콤마로 구분하여 입력하세요"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="file"
          className="w-full p-2 border rounded mb-4"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadDialog;
