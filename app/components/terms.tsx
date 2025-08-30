'use client';

import Link from 'next/link';

export default function Terms() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'white', 
      display: 'flex', 
      flexDirection: 'column',
      fontFamily: "'Wanted Sans', 'BDO Grotesk', system-ui, sans-serif"
    }}>
      
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '32px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <Link href="/">
          <img 
            src="/YSFMain.svg" 
            alt="Youth Startup Forum" 
            style={{ height: '40px', cursor: 'pointer' }}
          />
        </Link>
        <Link 
          href="/login"
          style={{
            backgroundColor: '#000000',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '14px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1f1f1f';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#000000';
          }}
        >
          Sign In
        </Link>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: '40px 32px',
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%'
      }}>
        
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: '500', 
          color: '#1f2937', 
          marginBottom: '24px'
        }}>
          Terms of Service
        </h1>
        
        <p style={{ 
          color: '#6b7280', 
          fontSize: '16px',
          marginBottom: '32px'
        }}>
          Last updated: August 2025
        </p>

        <div style={{ lineHeight: '1.7', color: '#374151' }}>
          
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '16px', color: '#1f2937' }}>
              1. Acceptance of Terms
            </h2>
            <p style={{ marginBottom: '16px' }}>
              By accessing and using the Youth Startup Forum (YSF) platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '16px', color: '#1f2937' }}>
              2. Membership and Community
            </h2>
            <p style={{ marginBottom: '16px' }}>
              YSF is a community platform for student entrepreneurs across Korean universities. By creating an account, you represent that:
            </p>
            <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
              <li>You are a current student or recent graduate of a Korean university</li>
              <li>You have an interest in entrepreneurship or startup activities</li>
              <li>You will provide accurate information during registration</li>
              <li>You will maintain the confidentiality of your account credentials</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '16px', color: '#1f2937' }}>
              3. Community Guidelines
            </h2>
            <p style={{ marginBottom: '16px' }}>
              YSF maintains a professional and supportive environment. Users agree to:
            </p>
            <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
              <li>Respect fellow community members</li>
              <li>Share relevant and valuable content</li>
              <li>Protect confidential information shared by other members</li>
              <li>Avoid spam, harassment, or inappropriate content</li>
              <li>Use the platform for legitimate business and educational purposes</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '16px', color: '#1f2937' }}>
              4. Intellectual Property
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Users retain ownership of content they create and share on the platform. By posting content, you grant YSF a non-exclusive license to use, display, and distribute your content within the platform for community purposes.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '16px', color: '#1f2937' }}>
              5. Privacy and Data Protection
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '16px', color: '#1f2937' }}>
              6. Limitation of Liability
            </h2>
            <p style={{ marginBottom: '16px' }}>
              YSF provides the platform "as is" without warranties. We are not liable for any damages arising from your use of the platform or interactions with other members.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '16px', color: '#1f2937' }}>
              7. Termination
            </h2>
            <p style={{ marginBottom: '16px' }}>
              YSF reserves the right to terminate accounts that violate these terms or disrupt the community. Users may delete their accounts at any time.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '16px', color: '#1f2937' }}>
              8. Changes to Terms
            </h2>
            <p style={{ marginBottom: '16px' }}>
              These terms may be updated periodically. Continued use of the platform constitutes acceptance of any changes.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '16px', color: '#1f2937' }}>
              9. Contact Information
            </h2>
            <p style={{ marginBottom: '16px' }}>
              For questions about these Terms of Service, please contact us through our support page.
            </p>
          </section>

        </div>

        <div style={{ 
          marginTop: '48px',
          paddingTop: '24px',
          borderTop: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <Link 
            href="/register"
            style={{
              backgroundColor: '#000000',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '16px',
              marginRight: '16px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1f1f1f';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#000000';
            }}
          >
            I Agree - Sign Up
          </Link>
          <Link 
            href="/"
            style={{
              color: '#6b7280',
              textDecoration: 'none',
              fontSize: '16px'
            }}
          >
            Back to Home
          </Link>
        </div>
        
      </div>
      
      {/* Footer - Same as other pages */}
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