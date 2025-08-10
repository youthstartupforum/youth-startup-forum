import React from 'react';

export default function YouthStartupForum() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-['BDO_Grotesk']">
      {/* Main Content Container */}
      <div 
        className="flex-1 flex flex-col items-center px-4 sm:px-8 lg:px-16"
        style={{
          paddingTop: '160px',
          paddingBottom: '40px',
          paddingLeft: '32px',
          paddingRight: '32px',
          gap: '32px'
        }}
      >
        
        {/* Logo */}
        <img 
          src="/YSFMain.svg" 
          alt="Youth Startup Forum" 
          className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto"
        />
        
        {/* Vision Text */}
        <div className="max-w-3xl text-center text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed">
          <p className="mb-4">
            우리는 느슨하지만 끈끈한 네트워크를 통해 전국의 학생 창업가들이
            프로젝트를 공유하고, 정보를 교류하며,
            창업 여정의 중요한 마일스톤을 함께 만들어갑니다.
          </p>
          <p className="mb-4">
            회원들은 국내를 넘어 글로벌 스케일의 정보와 네트워크를 접하고,
            “어떻게 시작할까”라는 질문에 가장 빠른 답을 찾을 수 있습니다.
          </p>
          <p>
            우리의 목표는 대한민국 대학 중심의 창업 생태계를
            지속적으로 성장시키고, 유망 스타트업을 배출하는 시스템을
            만들어내는 것입니다.
          </p>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-sm sm:max-w-md justify-center items-center">
          <button 
            className="bg-black text-white px-6 py-3 text-sm font-medium rounded hover:bg-gray-800 transition-colors w-full sm:w-auto"
            style={{
              backgroundColor: '#000000',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Join us
          </button>
          <button 
            className="bg-gray-100 text-black px-6 py-3 text-sm font-medium rounded hover:bg-gray-200 transition-colors w-full sm:w-auto"
            style={{
              backgroundColor: '#f3f4f6',
              color: '#000000',
              padding: '12px 24px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Members
          </button>
        </div>
        
      </div>
      
      {/* Footer */}
      <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-8 lg:px-16 py-6 sm:py-8">
        
        {/* Left Side - YSF Support */}
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src="/YSFshort.svg"
            alt="YSF"
            className="h-6 w-auto"
          />
          <span className="text-gray-500 text-xs sm:text-sm">Support</span>
        </div>
        
        {/* Right Side - Social Icons */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/youthstartupforum"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/youthstartupforum"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
            </svg>
          </a>
          
          {/* X (Twitter) */}
          <a
            href="https://x.com/ysfkorea"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z"/>
            </svg>
          </a>
        </div>
        
      </footer>
    </div>
  );
}
