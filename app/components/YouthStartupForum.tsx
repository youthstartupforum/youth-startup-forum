import React from 'react';
import Link from 'next/link';

export default function YouthStartupForum() {
  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Wanted Sans', 'BDO Grotesk', system-ui, sans-serif" }}>
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
          className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto mb-6"
        />
        
        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 w-full max-w-xs sm:max-w-md md:max-w-lg justify-center items-center mb-6">
          <button 
            className="bg-black text-white px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg font-medium rounded-md sm:rounded-lg hover:bg-gray-800 hover:scale-105 transition-all duration-200 w-full sm:w-auto shadow-md hover:shadow-lg"
            style={{
              backgroundColor: '#000000',
              color: '#ffffff',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Join us
          </button>
          <a
            href="https://youthstartupforum.com/members"
            className="bg-gray-100 text-black px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg font-medium rounded-md sm:rounded-lg hover:bg-gray-200 hover:scale-105 transition-all duration-200 w-full sm:w-auto shadow-md hover:shadow-lg inline-block text-center no-underline"
            style={{
              backgroundColor: '#f3f4f6',
              color: '#000000',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              textDecoration: 'none'
            }}
          >
            Members
          </a>
        </div>
        
        {/* Vision Text */}
        <div className="max-w-3xl text-left text-gray-800 leading-relaxed">
          <p className="mb-6" style={{ fontSize: '16px', lineHeight: '1.6' }}>
            Through our dynamic yet interconnected network, we unite student entrepreneurs across the nation
            to share visionary projects, exchange transformative insights, and collaboratively forge
            the pivotal milestones that define their entrepreneurial odyssey.
          </p>
          <p className="mb-6" style={{ fontSize: '16px', lineHeight: '1.6' }}>
            Our members gain access to information and networks that transcend national boundaries,
            reaching global scales, empowering them to discover the swiftest answers to the fundamental question:
            "How do we begin?"
          </p>
          <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
            Our mission is to cultivate a thriving entrepreneurial ecosystem centered around South Korea's universities,
            establishing a dynamic system that continuously nurtures growth and produces the next generation of promising startups.
          </p>
        </div>
        
      </div>
      
      {/* Footer */}
      <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-8 lg:px-16 py-6 sm:py-8 w-full max-w-7xl mx-auto">
        
        {/* Left Side - YSF Support */}
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src="/YSFshort.svg"
            alt="YSF"
            className="h-6 w-auto"
          />
          <Link href="/support" className="text-gray-500 hover:text-gray-700 transition-colors text-xs sm:text-sm">
            Support
          </Link>
        </div>
        
        {/* Right Side - Social Icons */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/youthstartupforum"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/youthstartupforum"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          
          {/* X (Twitter) */}
          <a
            href="https://x.com/ysfkorea"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
        
      </footer>
    </div>
  );
}