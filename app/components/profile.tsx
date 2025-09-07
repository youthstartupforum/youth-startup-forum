'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qdogjagrdciiewgjsmll.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkb2dqYWdyZGNpaWV3Z2pzbWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5ODk3NjYsImV4cCI6MjA2ODU2NTc2Nn0.QC1W4SNbXVZb9Gzejbiu-iNKlMe97FOaXJ_C6Ng_9BM';
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const getDisplayName = (user: any) => {
    if (user?.user_metadata?.first_name) {
      return user.user_metadata.first_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  const getFullName = (user: any) => {
    const firstName = user?.user_metadata?.first_name || '';
    const lastName = user?.user_metadata?.last_name || '';
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    if (firstName) return firstName;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: "'Wanted Sans', 'BDO Grotesk', system-ui, sans-serif"
      }}>
        <p style={{ fontSize: '18px', color: '#6b7280' }}>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Wanted Sans', 'BDO Grotesk', system-ui, sans-serif" }}>
      {/* Auth Button - Top Right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-10">
        {user ? (
          <div className="flex items-center gap-3">
            <button
              onClick={handleProfileClick}
              className="text-black hover:text-gray-600 transition-colors duration-200 text-sm sm:text-base font-medium cursor-pointer"
              style={{
                background: 'none',
                border: 'none',
                fontWeight: '500',
                textDecoration: 'underline'
              }}
            >
              {getDisplayName(user)}
            </button>
            <button
              onClick={handleLogout}
              className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-medium rounded-md hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg"
              style={{
                backgroundColor: '#000000',
                color: '#ffffff',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-medium rounded-md hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg"
            style={{
              backgroundColor: '#000000',
              color: '#ffffff',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            Login
          </Link>
        )}
      </div>
      
      {/* Main Content Container */}
      <div 
        className="flex-1 flex flex-col items-center px-4 sm:px-8 lg:px-16"
        style={{
          paddingTop: '120px',
          paddingBottom: '40px',
          paddingLeft: '32px',
          paddingRight: '32px',
          gap: '32px'
        }}
      >
        
        {/* Logo */}
        <Link href="/">
          <img 
            src="/YSFMain.svg" 
            alt="Youth Startup Forum" 
            className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto mb-6 cursor-pointer hover:scale-105 transition-all duration-200"
          />
        </Link>
        
        {/* Profile Content */}
        <div className="w-full max-w-2xl">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: '500', 
              color: '#1f2937', 
              marginBottom: '16px',
              margin: '0 0 16px 0'
            }}>
              Profile
            </h1>
            <p style={{ 
              color: '#6b7280', 
              fontSize: '16px', 
              lineHeight: '1.6',
              margin: 0
            }}>
              Manage your Youth Startup Forum account
            </p>
          </div>
          
          {/* Profile Information */}
          <div style={{
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '32px',
            marginBottom: '32px'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '500',
              color: '#1f2937',
              marginBottom: '24px',
              margin: '0 0 24px 0'
            }}>
              Account Information
            </h2>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Full Name
              </label>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                margin: 0,
                padding: '12px',
                backgroundColor: '#ffffff',
                border: '1px solid #d1d5db',
                borderRadius: '8px'
              }}>
                {getFullName(user)}
              </p>
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Email Address
              </label>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                margin: 0,
                padding: '12px',
                backgroundColor: '#ffffff',
                border: '1px solid #d1d5db',
                borderRadius: '8px'
              }}>
                {user?.email || 'No email provided'}
              </p>
            </div>
            
            {user?.user_metadata?.institution && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Institution
                </label>
                <p style={{
                  fontSize: '16px',
                  color: '#6b7280',
                  margin: 0,
                  padding: '12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px'
                }}>
                  {user.user_metadata.institution}
                </p>
              </div>
            )}
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Member Since
              </label>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                margin: 0,
                padding: '12px',
                backgroundColor: '#ffffff',
                border: '1px solid #d1d5db',
                borderRadius: '8px'
              }}>
                {new Date(user?.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
              href="/"
              style={{
                backgroundColor: '#000000',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '16px',
                transition: 'all 0.2s',
                display: 'inline-block'
              }}
            >
              Back to Home
            </Link>
            
            <Link
              href="/members"
              style={{
                backgroundColor: '#f3f4f6',
                color: '#000000',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '16px',
                transition: 'all 0.2s',
                display: 'inline-block',
                border: '1px solid #d1d5db'
              }}
            >
              View Members
            </Link>
          </div>
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
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.40z"/>
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