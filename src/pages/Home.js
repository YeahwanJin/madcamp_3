import React from 'react';
import HomeSidebar from '../components/HomeSidebar';
import HomeMainContent from '../components/HomeMainContent';
import HomeRightPanel from '../components/HomeRightPanel';

function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white shadow-md p-4">
        <HomeSidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 shadow-md mx-4 p-4">
        <HomeMainContent />
      </main>

      {/* Right Panel */}
      <aside className="w-1/5 bg-white shadow-md p-4">
        <HomeRightPanel />
      </aside>
    </div>
  );
}

export default Home;
