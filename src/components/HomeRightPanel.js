import React from 'react';
import '../css/Home_RightPanel.css';

function HomeRightPanel() {
  const recommendations = [
    'Madcamp',
    'Madcamp',
    'Madcamp',
    'Madcamp',
    'Madcamp',
  ];

  return (
    <aside className="right-panel bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-gray-500 text-sm font-bold mb-4">Recommendation</h3>
      <ul>
        {recommendations.map((recommend, index) => (
          <li
            key={index}
            className="flex items-center mb-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
          >
            <div className="bg-gray-300 rounded-full w-8 h-8 flex justify-center items-center text-sm font-bold text-white mr-2">
              {recommend[0]}
            </div>
            <span>{recommend}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default HomeRightPanel;
