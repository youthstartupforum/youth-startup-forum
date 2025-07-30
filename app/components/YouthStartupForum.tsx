import React from 'react';

export default function YouthStartupForum() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-2 sm:mb-3">
            Youth Startup Forum
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

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {/* Left Column */}
          <div className="space-y-6 sm:space-y-8">
            {/* Pink Pattern Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
              <div 
                className="w-full h-24 sm:h-32 lg:h-40 rounded-xl mb-4 lg:mb-6"
                style={{
                  background: 'linear-gradient(135deg, #FFB5E8 0%, #E8B5FF 100%)',
                  backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 1px, transparent 1px), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 lg:mb-3">A really compelling headline</h3>
              <p className="text-gray-600 text-xs sm:text-sm lg:text-base mb-4 lg:mb-6 leading-relaxed">
                Cat on a keyboard, forsooth, or virus of junk files. How likely is a page where people can
                craft new tech ideas about it.
              </p>
              <button className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors">
                Call to action
              </button>
            </div>

            {/* Purple Gradient Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
              <div 
                className="w-full h-24 sm:h-32 lg:h-40 rounded-xl mb-4 lg:mb-6"
                style={{
                  background: 'linear-gradient(135deg, #E8B5FF 0%, #B5C5FF 100%)'
                }}
              />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 lg:mb-3">Another scroll-stopper</h3>
              <p className="text-gray-600 text-xs sm:text-sm lg:text-base mb-4 lg:mb-6 leading-relaxed">
                When there's one giant thing, there's clearly another. What's your experience?
              </p>
              <button className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors">
                Another button
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 sm:space-y-8">
            {/* Teal Gradient Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
              <div 
                className="w-full h-24 sm:h-32 lg:h-40 rounded-xl mb-4 lg:mb-6"
                style={{
                  background: 'linear-gradient(135deg, #B5FFE8 0%, #5FBEAA 100%)'
                }}
              />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 lg:mb-3">Another scroll-stopper</h3>
              <p className="text-gray-600 text-xs sm:text-sm lg:text-base mb-4 lg:mb-6 leading-relaxed">
                When there's one giant thing, there's clearly another. What's your experience?
              </p>
              <button className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors">
                Another button
              </button>
            </div>

            {/* Additional mobile card for better mobile layout */}
            <div className="lg:hidden bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
              <div 
                className="w-full h-24 sm:h-32 rounded-xl mb-4"
                style={{
                  background: 'linear-gradient(135deg, #FFE8B5 0%, #FFB5D1 100%)'
                }}
              />
              <h3 className="text-lg sm:text-xl font-bold mb-2">More content</h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-4 leading-relaxed">
                Additional content section that appears on smaller screens for better mobile experience.
              </p>
              <button className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors">
                Learn more
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Text Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 lg:mb-16">
          <div className="bg-white p-4 sm:p-6 rounded-xl sm:bg-transparent sm:p-0">
            <h4 className="font-bold mb-2 lg:mb-3 text-sm sm:text-base lg:text-lg">Here text</h4>
            <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed">
              There's a theory that people read in an F-shape pattern, and that this should influence
              how we structure content on your website.
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl sm:bg-transparent sm:p-0">
            <h4 className="font-bold mb-2 lg:mb-3 text-sm sm:text-base lg:text-lg">There text</h4>
            <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed">
              And you thinking of keywords you should rank for? Are you thinking about it in your
              aim by continuous improvement?
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl sm:bg-transparent sm:p-0 sm:col-span-2 lg:col-span-1">
            <h4 className="font-bold mb-2 lg:mb-3 text-sm sm:text-base lg:text-lg">Everywhere text</h4>
            <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed">
              There's a theory that people read in an F-shape pattern, and that this should influence
              how we structure content on your website.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-300 rounded"></div>
              <span className="font-medium text-sm sm:text-base">Humanly</span>
            </div>
            
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600 order-3 sm:order-2">
              <span className="hover:text-gray-900 cursor-pointer">Features</span>
              <span className="hover:text-gray-900 cursor-pointer">Learn more</span>
              <span className="hover:text-gray-900 cursor-pointer">Support</span>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-4 order-2 sm:order-3">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-300 rounded cursor-pointer hover:bg-gray-400 transition-colors"></div>
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-300 rounded cursor-pointer hover:bg-gray-400 transition-colors"></div>
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-300 rounded cursor-pointer hover:bg-gray-400 transition-colors"></div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}