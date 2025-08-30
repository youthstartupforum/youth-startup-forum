'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Welcome() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  // Try to use environment variables first, fallback to hardcoded
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
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
        <button
          onClick={handleSignOut}
          style={{
            backgroundColor: '#000000',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
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
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px'
      }}>
        
        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: '500', 
            color: '#1f2937', 
            marginBottom: '24px',
            lineHeight: '1.1'
          }}>
            Welcome to YSF
          </h1>
          
          <p style={{ 
            color: '#6b7280', 
            fontSize: '18px',
            lineHeight: '1.6',
            marginBottom: '16px'
          }}>
            Hello {user?.email?.split('@')[0]}! You're now part of the Youth Startup Forum community.
          </p>

          <p style={{ 
            color: '#6b7280', 
            fontSize: '16px',
            lineHeight: '1.6',
            marginBottom: '40px'
          }}>
            Connect with student entrepreneurs across Korea's top universities, 
            share insights, and build the next generation of startups together.
          </p>

          <div style={{
            padding: '32px',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            backgroundColor: '#f9fafb',
            marginBottom: '32px'
          }}>
            <h3 style={{ 
              fontSize: '20px',
              fontWeight: '500',
              color: '#1f2937',
              marginBottom: '16px'
            }}>
              Coming Soon
            </h3>
            <p style={{ 
              color: '#6b7280', 
              fontSize: '14px',
              lineHeight: '1.5',
              margin: '0'
            }}>
              Member features like networking, startup showcases, exclusive events, 
              and resource sharing are currently in development. Stay tuned!
            </p>
          </div>

          <Link 
            href="/"
            style={{
              display: 'inline-block',
              backgroundColor: '#f3f4f6',
              color: '#000000',
              padding: '12px 24px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '16px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e5e7eb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
          >
            Back to Homepage
          </Link>
        </div>
        
      </div>
      
    </div>
  );
}