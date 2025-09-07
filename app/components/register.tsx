// Updated register.tsx with multi-step flow
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    institution: '',
    customInstitution: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    institution: '',
    customInstitution: '',
    agreeToTerms: '',
    form: ''
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    firstName: false,
    lastName: false,
    institution: false,
    customInstitution: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qdogjagrdciiewgjsmll.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkb2dqYWdyZGNpaWV3Z2pzbWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5ODk3NjYsImV4cCI6MjA2ODU2NTc2Nn0.QC1W4SNbXVZb9Gzejbiu-iNKlMe97FOaXJ_C6Ng_9BM';
  
  const supabase = createClient(supabaseUrl, supabaseKey);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const validateName = (name: string) => {
    return name.trim().length >= 2;
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        return '';
      
      case 'password':
        if (!value) return 'Password is required';
        if (!validatePassword(value)) return 'Password must be at least 6 characters long';
        return '';
      
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      
      case 'firstName':
        if (!value.trim()) return 'First name is required';
        if (!validateName(value)) return 'First name must be at least 2 characters';
        return '';
      
      case 'lastName':
        if (!value.trim()) return 'Last name is required';
        if (!validateName(value)) return 'Last name must be at least 2 characters';
        return '';
      
      case 'institution':
        if (!value.trim()) return 'Institution is required';
        return '';
      
      case 'customInstitution':
        if (formData.institution === 'Other' && !value.trim()) {
          return 'Please enter your institution name';
        }
        return '';
      
      default:
        return '';
    }
  };

  // Updated Google OAuth handler for multi-step flow
  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/complete-registration`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      if (error) {
        setErrors(prev => ({
          ...prev,
          form: 'Google sign up failed. Please try again.'
        }));
        setIsLoading(false);
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        form: 'Google sign up failed. Please try again.'
      }));
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
      firstName: true,
      lastName: true,
      institution: true,
      customInstitution: true
    });

    const newErrors = {
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
      confirmPassword: validateField('confirmPassword', formData.confirmPassword),
      firstName: validateField('firstName', formData.firstName),
      lastName: validateField('lastName', formData.lastName),
      institution: validateField('institution', formData.institution),
      customInstitution: validateField('customInstitution', formData.customInstitution),
      agreeToTerms: !formData.agreeToTerms ? 'You must agree to the terms and conditions' : '',
      form: ''
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) {
      setIsLoading(false);
      return;
    }

    try {
      const finalInstitution = formData.institution === 'Other' ? formData.customInstitution : formData.institution;
      
      // Create user with email/password and user metadata
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            institution: finalInstitution,
            registration_method: 'email'
          }
        }
      });

      if (authError) {
        setErrors(prev => ({
          ...prev,
          form: authError.message
        }));
        setIsLoading(false);
        return;
      }

      // If user was created successfully, create profile entry
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            user_id: authData.user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            institution: finalInstitution,
            registration_completed: true,
            terms_accepted_at: new Date().toISOString(),
            privacy_accepted_at: new Date().toISOString(),
            registration_method: 'email'
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Continue anyway since the user was created
        }
      }

      alert('Registration successful! Please check your email to verify your account.');
      router.push('/welcome');
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        form: 'An unexpected error occurred. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = 'checked' in e.target ? e.target.checked : false;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (type !== 'checkbox' && touched[name as keyof typeof touched]) {
      const fieldError = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
      
      if (name === 'password' && formData.confirmPassword) {
        const confirmError = formData.confirmPassword !== value ? 'Passwords do not match' : '';
        setErrors(prev => ({
          ...prev,
          confirmPassword: confirmError
        }));
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
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
      
      <div 
        className="flex-1 flex flex-col items-center px-4 sm:px-8 lg:px-16"
        style={{
          paddingTop: '80px',
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
            Sign Up for YSF
          </h1>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '16px', 
            lineHeight: '1.6',
            margin: 0
          }}>
            Create your Youth Startup Forum account
          </p>
        </div>
        
        <div style={{ 
          width: '100%', 
          maxWidth: '500px',
          marginBottom: '64px'
        }}>
          
          {/* Updated Google Sign Up Button */}
          <button 
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            style={{
              width: '100%',
              backgroundColor: '#ffffff',
              color: '#374151',
              padding: '12px 20px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              marginBottom: '16px',
              opacity: isLoading ? 0.6 : 1
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = '#f9fafb';
                e.currentTarget.style.borderColor = '#9ca3af';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = '#d1d5db';
              }
            }}
          >
            {isLoading ? (
              <span>Connecting...</span>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>
          
          {/* Updated terms notice for Google signup */}
          <div style={{ 
            textAlign: 'center',
            fontSize: '12px',
            color: '#6b7280',
            marginBottom: '24px',
            lineHeight: '1.4'
          }}>
            By continuing with Google, you'll review and accept our{' '}
            <Link href="/terms" style={{ color: '#000000', textDecoration: 'underline' }}>
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" style={{ color: '#000000', textDecoration: 'underline' }}>
              Privacy Policy
            </Link>{' '}
            on the next step.
          </div>
          
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
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '400px' }}>
              
              <form onSubmit={handleSubmit}>
                
                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ flex: 1 }}>
                    <label 
                      htmlFor="firstName" 
                      style={{
                        display: 'block',
                        fontSize: '16px',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '8px'
                      }}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="First name"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: errors.firstName ? '2px solid #ef4444' : (touched.firstName && !errors.firstName ? '1px solid #22c55e' : '1px solid #d1d5db'),
                        borderRadius: '8px',
                        backgroundColor: '#ffffff',
                        fontSize: '16px',
                        transition: 'all 0.2s',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    {errors.firstName && (
                      <span style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px', display: 'block' }}>
                        {errors.firstName}
                      </span>
                    )}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <label 
                      htmlFor="lastName" 
                      style={{
                        display: 'block',
                        fontSize: '16px',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '8px'
                      }}
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Last name"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: errors.lastName ? '2px solid #ef4444' : (touched.lastName && !errors.lastName ? '1px solid #22c55e' : '1px solid #d1d5db'),
                        borderRadius: '8px',
                        backgroundColor: '#ffffff',
                        fontSize: '16px',
                        transition: 'all 0.2s',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    {errors.lastName && (
                      <span style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px', display: 'block' }}>
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>
                
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
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your email"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: errors.email ? '2px solid #ef4444' : (touched.email && !errors.email ? '1px solid #22c55e' : '1px solid #d1d5db'),
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      fontSize: '16px',
                      transition: 'all 0.2s',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  {errors.email && (
                    <span style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px', display: 'block' }}>
                      {errors.email}
                    </span>
                  )}
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <label 
                    htmlFor="institution" 
                    style={{
                      display: 'block',
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '8px'
                    }}
                  >
                    Institution
                  </label>
                  <select
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: errors.institution ? '2px solid #ef4444' : (touched.institution && !errors.institution ? '1px solid #22c55e' : '1px solid #d1d5db'),
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      fontSize: '16px',
                      transition: 'all 0.2s',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="">Select your institution</option>
                    
                    <option value="Y-VENTURES (Yonsei University)">Y-VENTURES (Yonsei University)</option>
                    <option value="HySpark (Hanyang University)">HySpark (Hanyang University)</option>
                    <option value="SNAAC (Seoul National University)">SNAAC (Seoul National University)</option>
                    <option value="VERY (Yonsei University)">VERY (Yonsei University)</option>
                    <option value="FLIP (Kyung Hee University)">FLIP (Kyung Hee University)</option>
                    <option value="INSIDERS (Yonsei & Korea University)">INSIDERS (Yonsei & Korea University)</option>
                    <option value="BLACKBOX (Sogang University)">BLACKBOX (Sogang University)</option>
                    <option value="KE (KAIST)">KE (KAIST)</option>
                    <option value="Tech-Review (POSTECH)">Tech-Review (POSTECH)</option>
                    <option value="APGC-Lab (POSTECH)">APGC-Lab (POSTECH)</option>
                    <option value="CEOS (Sinchon Union)">CEOS (Sinchon Union)</option>
                    <option value="UNIS (Ewha University)">UNIS (Ewha University)</option>
                    <option value="MOP (GIST)">MOP (GIST)</option>
                    <option value="NEXT (Korea University)">NEXT (Korea University)</option>
                    <option value="MEDILUX (Healthcare Undergrad)">MEDILUX (Healthcare Undergrad)</option>
                    
                    <option value="Other">Other</option>
                  </select>
                  {errors.institution && (
                    <span style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px', display: 'block' }}>
                      {errors.institution}
                    </span>
                  )}
                  
                  {formData.institution === 'Other' && (
                    <div style={{ marginTop: '12px' }}>
                      <input
                        type="text"
                        name="customInstitution"
                        value={formData.customInstitution}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your institution name"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: errors.customInstitution ? '2px solid #ef4444' : '1px solid #d1d5db',
                          borderRadius: '8px',
                          backgroundColor: '#ffffff',
                          fontSize: '16px',
                          transition: 'all 0.2s',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                      {errors.customInstitution && (
                        <span style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px', display: 'block' }}>
                          {errors.customInstitution}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <label 
                    htmlFor="password" 
                    style={{
                      display: 'block',
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '8px'
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
                    onBlur={handleBlur}
                    placeholder="Enter your password"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: errors.password ? '2px solid #ef4444' : (touched.password && !errors.password ? '1px solid #22c55e' : '1px solid #d1d5db'),
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      fontSize: '16px',
                      transition: 'all 0.2s',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  {errors.password && (
                    <span style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px', display: 'block' }}>
                      {errors.password}
                    </span>
                  )}
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <label 
                    htmlFor="confirmPassword" 
                    style={{
                      display: 'block',
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '8px'
                    }}
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Confirm your password"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: errors.confirmPassword ? '2px solid #ef4444' : (touched.confirmPassword && !errors.confirmPassword ? '1px solid #22c55e' : '1px solid #d1d5db'),
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      fontSize: '16px',
                      transition: 'all 0.2s',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  {errors.confirmPassword && (
                    <span style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px', display: 'block' }}>
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
                
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      style={{ 
                        marginTop: '2px',
                        width: '16px',
                        height: '16px'
                      }}
                    />
                    <span style={{ 
                      fontSize: '14px', 
                      color: '#374151',
                      lineHeight: '1.5'
                    }}>
                      I agree to the <Link href="/terms" style={{ color: '#000000', textDecoration: 'underline' }}>Terms of Service</Link> and <Link href="/privacy" style={{ color: '#000000', textDecoration: 'underline' }}>Privacy Policy</Link>
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <span style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px', display: 'block' }}>
                      {errors.agreeToTerms}
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
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </button>
                
                {errors.form && (
                  <div style={{
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#dc2626',
                    padding: '16px',
                    borderRadius: '8px',
                    marginBottom: '24px',
                    fontSize: '14px'
                  }}>
                    {errors.form}
                  </div>
                )}
                
              </form>
              
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
                  Already have an account? 
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
                    Sign in here
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