import React from 'react';
import HomeSidebar from '../components/HomeSidebar';
import HomeMainContent from '../components/HomeMainContent';
import HomeRightPanel from '../components/HomeRightPanel';

function Home() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="lg:w-1/5 w-full bg-white shadow-lg p-6 rounded-lg lg:rounded-none lg:shadow-md mb-6 lg:mb-0">
        <HomeSidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 shadow-lg mx-4 lg:mx-6 p-6 rounded-lg lg:rounded-none lg:shadow-md">
        <HomeMainContent />
      </main>

      {/* Right Panel */}
      <aside className="lg:w-1/5 w-full bg-white shadow-lg p-6 rounded-lg lg:rounded-none lg:shadow-md mt-6 lg:mt-0">
        <HomeRightPanel />
      </aside>
    </div>
  );
}

export default Home;
