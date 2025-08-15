"use client";
import React, { useState } from 'react';
import Link from 'next/link';

function Members() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const members = [
    {
      name: 'Y-VENTURES',
      description: 'Yonsei',
      image: 'https://placehold.co/240x234',
      website: 'https://yventures.yonsei.ac.kr',
      linkedin: 'https://linkedin.com/company/y-ventures',
      instagram: 'https://instagram.com/yventures'
    },
    {
      name: 'HySpark',
      description: 'Hanyang', 
      image: 'https://placehold.co/240x234',
      website: 'https://hyspark.hanyang.ac.kr',
      linkedin: 'https://linkedin.com/company/hyspark',
      instagram: 'https://instagram.com/hyspark'
    },
    {
      name: 'Flip',
      description: 'Kyunghee',
      image: 'https://placehold.co/240x234',
      website: 'https://flip.khu.ac.kr',
      linkedin: 'https://linkedin.com/company/flip-khu',
      instagram: 'https://instagram.com/flip_khu'
    },
    {
      name: 'Insiders',
      description: 'Yonsei & Korea',
      image: 'https://placehold.co/240x234',
      website: 'https://insiders.kr',
      linkedin: 'https://linkedin.com/company/insiders',
      instagram: 'https://instagram.com/insiders'
    },
    {
      name: 'blackbox',
      description: 'Sogang',
      image: 'https://placehold.co/240x234',
      website: 'https://blackbox.sogang.ac.kr',
      linkedin: 'https://linkedin.com/company/blackbox-sogang',
      instagram: 'https://instagram.com/blackbox_sogang'
    }
  ];

  const handleMouseEnter = React.useCallback((cardIndex) => {
    setHoveredCard(cardIndex);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setHoveredCard(null);
  }, []);

  const isCardHovered = React.useCallback((cardIndex) => {
    return hoveredCard === cardIndex;
  }, [hoveredCard]);

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Wanted Sans', 'BDO Grotesk', system-ui, sans-serif" }}>
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
        
        <a href="https://youthstartupforum.com">
          <img 
            src="/YSFMain.svg" 
            alt="Youth Startup Forum" 
            className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto mb-6"
          />
        </a>

        {/* Join Us Button */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 w-full max-w-xs sm:max-w-md md:max-w-lg justify-center items-center mb-8">
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
        </div>
        
        <div className="w-full max-w-7xl px-4 sm:px-8 lg:px-16 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {members.map((member, index) => (
              <div 
                key={index}
                className="h-80 relative bg-white overflow-hidden rounded-2xl flex flex-col border border-gray-300 transition-all duration-300"
                style={{ 
                  boxShadow: isCardHovered(index) 
                    ? '2px 4px 12px rgba(0, 0, 0, 0.12), 1px 1px 6px rgba(0, 0, 0, 0.08)' 
                    : '1px 2px 6px rgba(0, 0, 0, 0.08), 0.5px 0.5px 2px rgba(0, 0, 0, 0.04)',
                  transform: isCardHovered(index) ? 'translateY(-2px)' : 'translateY(0)',
                  backgroundColor: isCardHovered(index) ? '#f8f9fa' : 'white'
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="p-6 flex flex-col gap-2">
                  <div className="text-black text-xl font-semibold leading-6 text-center">
                    {member.name}
                  </div>
                  <div className="text-black text-opacity-60 text-base font-medium leading-6 text-center">
                    {member.description}
                  </div>
                </div>
                <img 
                  className="w-48 h-48 absolute left-1/2 transform -translate-x-1/2 top-24 rounded-3xl border-4 border-white"
                  style={{ boxShadow: '0px 5px 19px rgba(0, 0, 0, 0.08)' }}
                  src={member.image} 
                  alt={member.name}
                />
                
                <div 
                  className="absolute flex gap-3 transition-all duration-300"
                  style={{
                    top: '170px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    opacity: isCardHovered(index) ? 1 : 0,
                    pointerEvents: isCardHovered(index) ? 'auto' : 'none'
                  }}
                >
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 shadow-lg"
                  >
                    <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM11 19.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </a>
                  
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 shadow-lg"
                  >
                    <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 shadow-lg"
                  >
                    <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.40z"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
      
      <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-8 lg:px-16 py-6 sm:py-8 w-full max-w-7xl mx-auto">
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
        
        <div className="flex items-center gap-3 sm:gap-4">
          <a href="https://www.instagram.com/youthstartupforum" target="_blank" rel="noopener noreferrer">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.40z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/youthstartupforum" target="_blank" rel="noopener noreferrer">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://x.com/ysfkorea" target="_blank" rel="noopener noreferrer">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Members;