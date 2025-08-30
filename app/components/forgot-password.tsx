'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qdogjagrdciiewgjsmll.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkb2dqYWdyZGNpaWV3Z2pzbWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5ODk3NjYsImV4cCI6MjA2ODU2NTc2Nn0.QC1W4SNbXVZb9Gzejbiu-iNKlMe97FOaXJ_C6Ng_9BM';
  
  const supabase = createClient(supabaseUrl, supabaseKey);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    if (!email.trim()) {
      setError('Email is required');
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage('Password reset link has been sent to your email address. Please check your inbox and follow the instructions.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'white', 
      display: 'flex', 
      flexDirection: 'column',
      fontFamily: "'Wanted Sans', 'BDO Grotesk', system-ui, sans-serif"
    }}>
      
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
        
        <Link href="/">
          <img 
            src="/YSFMain.svg" 
            alt="Youth Startup Forum" 
            className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto mb-6 cursor-pointer hover:scale-105 transition-all duration-200"
          />
        </Link>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: '500', 
            color: '#1f2937', 
            marginBottom: '16px',
            margin: '0 0 16px 0'
          }}>
            Reset Password
          </h1>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '16px', 
            lineHeight: '1.6',
            margin: 0
          }}>
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>
        
        <div style={{ 
          width: '100%', 
          maxWidth: '500px',
          marginBottom: '128px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '400px' }}>
              
              {message ? (
                <div style={{
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  color: '#166534',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '24px',
                  fontSize: '14px',
                  lineHeight: '1.5'
                }}>
                  {message}
                  <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <Link 
                      href="/login"
                      style={{
                        color: '#166534',
                        textDecoration: 'underline',
                        fontWeight: '500'
                      }}
                    >
                      Back to Login
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  
                  <div style={{ marginBottom: '24px' }}>
                    <label 
                      htmlFor="email" 
                      style={{
                        display: 'block',
                        fontSize: '16px',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '8px'
                      }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: error ? '2px solid #ef4444' : '1px solid #d1d5db',
                        borderRadius: '8px',
                        backgroundColor: '#ffffff',
                        fontSize: '16px',
                        transition: 'all 0.2s',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#6b7280';
                        e.currentTarget.style.boxShadow = '0 0 0 2px rgba(107, 114, 128, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = error ? '#ef4444' : '#d1d5db';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                    {error && (
                      <span style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px', display: 'block' }}>
                        {error}
                      </span>
                    )}
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    style={{
                      width: '100%',
                      backgroundColor: isLoading ? '#9ca3af' : '#000000',
                      color: '#ffffff',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      fontWeight: '500',
                      fontSize: '16px',
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      marginBottom: '24px'
                    }}
                    onMouseEnter={(e) => {
                      if (!isLoading) {
                        e.currentTarget.style.backgroundColor = '#1f1f1f';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isLoading) {
                        e.currentTarget.style.backgroundColor = '#000000';
                      }
                    }}
                  >
                    {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
                  </button>
                  
                </form>
              )}
              
              <div style={{ 
                textAlign: 'center', 
                marginTop: '24px'
              }}>
                <p style={{ 
                  color: '#6b7280',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Remember your password? 
                  <Link 
                    href="/login" 
                    style={{
                      color: '#000000',
                      fontWeight: '500',
                      textDecoration: 'none',
                      marginLeft: '4px',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#4b5563';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#000000';
                    }}
                  >
                    Back to Login
                  </Link>
                </p>
              </div>
              
            </div>
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
          <a
            href="https://www.instagram.com/youthstartupforum"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.40z"/>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/youthstartupforum"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="https://x.com/ysfkorea"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}