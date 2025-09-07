// complete-registration.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

export default function CompleteRegistration() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    institution: '',
    customInstitution: '',
    acceptedTerms: false,
    acceptedPrivacy: false
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    institution: '',
    customInstitution: '',
    acceptedTerms: '',
    acceptedPrivacy: '',
    form: ''
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    institution: false,
    customInstitution: false
  });

  const router = useRouter();
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qdogjagrdciiewgjsmll.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkb2dqYWdyZGNpaWV3Z2pzbWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5ODk3NjYsImV4cCI6MjA2ODU2NTc2Nn0.QC1W4SNbXVZb9Gzejbiu-iNKlMe97FOaXJ_C6Ng_9BM';
  
  const supabase = createClient(supabaseUrl, supabaseKey);

  const institutions = [
    'Y-VENTURES (Yonsei University)',
    'HySpark (Hanyang University)',
    'SNAAC (Seoul National University)',
    'VERY (Yonsei University)',
    'FLIP (Kyung Hee University)',
    'INSIDERS (Yonsei & Korea University)',
    'BLACKBOX (Sogang University)',
    'KE (KAIST)',
    'Tech-Review (POSTECH)',
    'APGC-Lab (POSTECH)',
    'CEOS (Sinchon Union)',
    'UNIS (Ewha University)',
    'MOP (GIST)',
    'NEXT (Korea University)',
    'MEDILUX (Healthcare Undergrad)',
    'Other'
  ];

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          router.push('/login');
          return;
        }

        // Check if user already completed registration
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profile?.registration_completed) {
          router.push('/welcome');
          return;
        }

        // Pre-fill with Google data if available
        setFormData(prev => ({
          ...prev,
          firstName: user.user_metadata?.given_name || user.user_metadata?.first_name || '',
          lastName: user.user_metadata?.family_name || user.user_metadata?.last_name || ''
        }));
        
        setUser(user);
        setLoading(false);
      } catch (error) {
        console.error('Error getting user:', error);
        router.push('/login');
      }
    };

    getUser();
  }, [router]);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'firstName':
        if (!value.trim()) return 'First name is required';
        if (value.trim().length < 2) return 'First name must be at least 2 characters';
        return '';
      
      case 'lastName':
        if (!value.trim()) return 'Last name is required';
        if (value.trim().length < 2) return 'Last name must be at least 2 characters';
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

  // Fixed version of the handleSubmit function from complete-registration.tsx

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!formData.acceptedTerms || !formData.acceptedPrivacy) {
    setErrors(prev => ({
      ...prev,
      acceptedTerms: !formData.acceptedTerms ? 'You must accept the Terms of Service' : '',
      acceptedPrivacy: !formData.acceptedPrivacy ? 'You must accept the Privacy Policy' : ''
    }));
    return;
  }

  // Validate all fields
  setTouched({
    firstName: true,
    lastName: true,
    institution: true,
    customInstitution: true
  });

  const newErrors = {
    firstName: validateField('firstName', formData.firstName),
    lastName: validateField('lastName', formData.lastName),
    institution: validateField('institution', formData.institution),
    customInstitution: validateField('customInstitution', formData.customInstitution),
    acceptedTerms: '',
    acceptedPrivacy: '',
    form: ''
  };

  setErrors(newErrors);

  const hasErrors = Object.values(newErrors).some(error => error !== '');
  if (hasErrors) {
    return;
  }

  setSubmitting(true);

  try {
    if (!user) {
      setErrors(prev => ({
        ...prev,
        form: 'User session expired. Please try logging in again.'
      }));
      return;
    }

    const finalInstitution = formData.institution === 'Other' ? formData.customInstitution : formData.institution;

    // Create or update user profile
    const { error } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        institution: finalInstitution,
        registration_completed: true,
        terms_accepted_at: new Date().toISOString(),
        privacy_accepted_at: new Date().toISOString(),
        registration_method: 'google',
        created_at: new Date().toISOString()
      });

    if (error) throw error;

    // Redirect to dashboard or welcome page
    router.push('/welcome');
    
  } catch (error) {
    console.error('Error completing registration:', error);
    setErrors(prev => ({
      ...prev,
      form: 'There was an error completing your registration. Please try again.'
    }));
  } finally {
    setSubmitting(false);
  }
};

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: 'white', 
        display: 'flex', 
        flexDirection: 'column',
        fontFamily: "'Wanted Sans', 'BDO Grotesk', system-ui, sans-serif",
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '18px', 
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            Setting up your account...
          </div>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #f3f4f6',
            borderTop: '3px solid #000000',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
        </div>
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `
        }}></style>
      </div>
    );
  }

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
            Complete Your Registration
          </h1>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '16px', 
            lineHeight: '1.6',
            margin: 0
          }}>
            Just a few more details to get started with YSF
          </p>
        </div>
        
        <div style={{ 
          width: '100%', 
          maxWidth: '500px',
          marginBottom: '64px'
        }}>
          
          <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            
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
                  required
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
                  required
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
                required
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
                {institutions.map((institution) => (
                  <option key={institution} value={institution}>
                    {institution}
                  </option>
                ))}
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

            <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <input
                    type="checkbox"
                    name="acceptedTerms"
                    checked={formData.acceptedTerms}
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
                    I accept the{' '}
                    <Link 
                      href="/terms" 
                      target="_blank" 
                      style={{ color: '#000000', textDecoration: 'underline' }}
                    >
                      Terms of Service
                    </Link>
                  </span>
                </label>
                {errors.acceptedTerms && (
                  <span style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px', display: 'block', marginLeft: '28px' }}>
                    {errors.acceptedTerms}
                  </span>
                )}
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <input
                    type="checkbox"
                    name="acceptedPrivacy"
                    checked={formData.acceptedPrivacy}
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
                    I accept the{' '}
                    <Link 
                      href="/privacy" 
                      target="_blank" 
                      style={{ color: '#000000', textDecoration: 'underline' }}
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.acceptedPrivacy && (
                  <span style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px', display: 'block', marginLeft: '28px' }}>
                    {errors.acceptedPrivacy}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || !formData.acceptedTerms || !formData.acceptedPrivacy}
              style={{
                width: '100%',
                backgroundColor: (submitting || !formData.acceptedTerms || !formData.acceptedPrivacy) ? '#9ca3af' : '#000000',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                cursor: (submitting || !formData.acceptedTerms || !formData.acceptedPrivacy) ? 'not-allowed' : 'pointer',
                fontWeight: '500',
                fontSize: '16px',
                transition: 'all 0.2s',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                marginBottom: '24px'
              }}
              onMouseEnter={(e) => {
                if (!submitting && formData.acceptedTerms && formData.acceptedPrivacy) {
                  e.currentTarget.style.backgroundColor = '#1f1f1f';
                }
              }}
              onMouseLeave={(e) => {
                if (!submitting && formData.acceptedTerms && formData.acceptedPrivacy) {
                  e.currentTarget.style.backgroundColor = '#000000';
                }
              }}
            >
              {submitting ? 'Creating Account...' : 'Complete Registration'}
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