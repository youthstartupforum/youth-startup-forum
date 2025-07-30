import React from 'react';

export default function MembersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-2 sm:mb-3">
            Members
          </h1>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl mb-6 lg:mb-8">coming soon</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 lg:mb-12">
            <button className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base">
              Call to action
            </button>
            <button className="bg-gray-200 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium hover:bg-gray-300 transition-colors text-sm sm:text-base">
              Another button
            </button>
          </div>
        </div>

        {/* Main Gradient Section */}
        <div className="relative mb-8 lg:mb-12">
          <div 
            className="w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-2xl mb-4 lg:mb-6"
            style={{
              background: 'linear-gradient(135deg, #E8B5CE 0%, #9BB5FF 25%, #B5E8CE 50%, #5FBEAA 100%)'
            }}
          />
          <p className="text-center text-gray-600 mb-6 lg:mb-8 text-sm sm:text-base">
            Drop some names with confidence
          </p>
          
          {/* Logo Section */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded"></div>
              <span className="text-sm sm:text-base">Logolpsum</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded"></div>
              <span className="text-sm sm:text-base">Logolpsum</span>
            </div>
            <div className="bg-gray-300 px-3 py-1 rounded-full text-xs sm:text-sm">
              logolpsum
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}