'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

export default function LoginPage() {
    console.log('=== LOGIN COMPONENT LOADED ===');
    console.log('Environment check:');
    console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('SUPABASE_KEY length:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length);
    console.log('================================');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    form: ''
  });

  const [touched, setTouched] = useState({
    username: false,
    password: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  // Hardcoded Supabase credentials (temporary for testing)
  const supabase = createClient(
    'https://qdogjagrdciiewgjsmll.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkb2dqYWdyZGNpaWV3Z2pzbWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5ODk3NjYsImV4cCI6MjA2ODU2NTc2Nn0.QC1W4SNbXVZb9Gzejbiu-iNKlMe97FOaXJ_C6Ng_9BM'
  );

  // Enhanced validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username: string) => {
    return username.length >= 3;
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'username':
        if (!value.trim()) {
          return 'Username or email is required';
        }
        if (value.includes('@')) {
          if (!validateEmail(value)) {
            return 'Please enter a valid email address';
          }
        } else {
          if (!validateUsername(value)) {
            return 'Username must be at least 3 characters long';
          }
        }
        return '';
      
      case 'password':
        if (!value) {
          return 'Password is required';
        }
        if (!validatePassword(value)) {
          return 'Password must be at least 6 characters long';
        }
        return '';
      
      default:
        return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mark all fields as touched
    setTouched({ username: true, password: true });

    // Validate all fields
    const usernameError = validateField('username', formData.username);
    const passwordError = validateField('password', formData.password);
    
    const newErrors = {
      username: usernameError,
      password: passwordError,
      form: ''
    };

    setErrors(newErrors);

    if (usernameError || passwordError) {
      setIsLoading(false);
      return;
    }

    try {
      // Attempt login with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.username,
        password: formData.password,
      });

      if (error) {
        setErrors(prev => ({
          ...prev,
          form: error.message
        }));
      } else {
        // Login successful - redirect to home page
        router.push('/');
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        form: 'An unexpected error occurred. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Real-time validation for text inputs
    if (type !== 'checkbox' && touched[name as keyof typeof touched]) {
      const fieldError = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate the field
    const fieldError = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'white', 
      display: 'flex', 
      flexDirection: 'column',
      fontFamily: "'Wanted Sans', 'BDO Grotesk', system-ui, sans-serif"
    }}>
      
      {/* Main Content Container - Exact same as homepage */}
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
        
        {/* Logo - Exact same as homepage */}
        <img 
          src="/YSFMain.svg" 
          alt="Youth Startup Forum" 
          className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto mb-6"
        />
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: '500', 
            color: '#1f2937', 
            marginBottom: '16px',
            margin: '0 0 16px 0'
          }}>
            Welcome Back
          </h1>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '16px', 
            lineHeight: '1.6',
            margin: 0
          }}>
            Sign in to your Youth Startup Forum account
          </p>
        </div>
        
        {/* Google Sign In Button */}
        <div style={{ 
          width: '100%', 
          maxWidth: '400px',
          marginBottom: '24px'
        }}>
          <button 
            onClick={async () => {
              try {
                const { data, error } = await supabase.auth.signInWithOAuth({
                  provider: 'google',
                  options: {
                    redirectTo: `${window.location.origin}/auth/callback`
                  }
                });
                
                if (error) {
                  setErrors(prev => ({
                    ...prev,
                    form: 'Google login failed. Please try again.'
                  }));
                }
              } catch (error) {
                setErrors(prev => ({
                  ...prev,
                  form: 'Google login failed. Please try again.'
                }));
              }
            }}
            style={{
              width: '100%',
              backgroundColor: '#ffffff',
              color: '#374151',
              padding: '12px 20px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              marginBottom: '16px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
              e.currentTarget.style.borderColor = '#9ca3af';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = '#d1d5db';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
          
          {/* Divider */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            margin: '24px 0',
            color: '#9ca3af',
            fontSize: '14px'
          }}>
            <div style={{ 
              flex: 1, 
              height: '1px', 
              backgroundColor: '#e5e7eb' 
            }}></div>
            <span style={{ 
              padding: '0 16px',
              backgroundColor: 'white'
            }}>
              or
            </span>
            <div style={{ 
              flex: 1, 
              height: '1px', 
              backgroundColor: '#e5e7eb' 
            }}></div>
          </div>
        </div>
        
        {/* Login Form Container - Narrower form */}
        <div style={{ 
          width: '100%', 
          maxWidth: '500px',
          marginBottom: '128px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '400px' }}>
              
              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                
                {/* Username/Email Field */}
                <div style={{ marginBottom: '32px' }}>
                  <label 
                    htmlFor="username" 
                    style={{
                      display: 'block',
                      fontSize: '18px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '16px'
                    }}
                  >
                    Username or Email
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username or email"
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      border: errors.username ? '2px solid #ef4444' : (touched.username && !errors.username ? '1px solid #22c55e' : '1px solid #d1d5db'),
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
                      handleBlur(e);
                      const borderColor = errors.username ? '#ef4444' : (touched.username && !errors.username ? '#22c55e' : '#d1d5db');
                      e.currentTarget.style.borderColor = borderColor;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                  {errors.username && (
                    <span style={{ 
                      color: '#ef4444', 
                      fontSize: '14px', 
                      marginTop: '8px', 
                      display: 'block' 
                    }}>
                      {errors.username}
                    </span>
                  )}
                </div>
                
                {/* Password Field */}
                <div style={{ marginBottom: '32px' }}>
                  <label 
                    htmlFor="password" 
                    style={{
                      display: 'block',
                      fontSize: '18px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '16px'
                    }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      border: errors.password ? '2px solid #ef4444' : (touched.password && !errors.password ? '1px solid #22c55e' : '1px solid #d1d5db'),
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
                      handleBlur(e);
                      const borderColor = errors.password ? '#ef4444' : (touched.password && !errors.password ? '#22c55e' : '#d1d5db');
                      e.currentTarget.style.borderColor = borderColor;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                  {errors.password && (
                    <span style={{ 
                      color: '#ef4444', 
                      fontSize: '14px', 
                      marginTop: '8px', 
                      display: 'block' 
                    }}>
                      {errors.password}
                    </span>
                  )}
                </div>
                
                {/* Remember Me & Forgot Password */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  marginBottom: '24px'
                }}>
                  <label style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      style={{ 
                        height: '20px', 
                        width: '20px',
                        marginRight: '12px'
                      }}
                    />
                    <span style={{ 
                      fontSize: '16px', 
                      color: '#374151',
                      fontWeight: '500'
                    }}>
                      Remember me
                    </span>
                  </label>
                  <Link 
                    href="/forgot-password" 
                    style={{ 
                      fontSize: '16px',
                      color: '#6b7280',
                      fontWeight: '500',
                      textDecoration: 'none',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#000000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#6b7280';
                    }}
                  >
                    Forgot Password?
                  </Link>
                </div>
                
                {/* Submit Button */}
                <div style={{ paddingTop: '24px' }}>
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
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isLoading) {
                        e.currentTarget.style.backgroundColor = '#1f1f1f';
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isLoading) {
                        e.currentTarget.style.backgroundColor = '#000000';
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                      }
                    }}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </button>
                </div>
                
                {/* Form Error */}
                {errors.form && (
                  <div style={{
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#dc2626',
                    padding: '24px',
                    borderRadius: '12px',
                    marginTop: '16px'
                  }}>
                    {errors.form}
                  </div>
                )}
                
              </form>
              
              {/* Sign Up Link */}
              <div style={{ 
                textAlign: 'center', 
                marginTop: '48px',
                paddingTop: '32px'
              }}>
                <p style={{ 
                  color: '#6b7280',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Don't have an account? 
                  <Link 
                    href="/register" 
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
                    Create one here
                  </Link>
                </p>
              </div>
              
            </div>
          </div>
        </div>
        
      </div>
      
      {/* Footer - Exactly same as homepage */}
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
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
        
      </footer>
    </div>
  );
}