import React from 'react';

export default function YouthStartupForum() {
  return (
    <div 
      className="min-h-screen relative"
      style={{
        background: 'linear-gradient(135deg, #87CEEB 0%, #98FB98 50%, #F0E68C 100%)',
      }}
    >
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6">
        <div 
          className="text-lg font-medium"
          style={{ 
            color: '#2C3831',
            fontFamily: 'Source Code Pro, monospace',
            fontSize: '16px',
            fontWeight: 400
          }}
        >
          WE ARE ONE'S OWN
        </div>
        
        <div className="flex space-x-8">
          {['Listen on Spotify', 'Instagram', 'Contact'].map((item, idx) => (
            <a 
              key={idx}
              href="#"
              className="hover:underline"
              style={{ 
                color: '#2C3831',
                fontFamily: 'Source Code Pro, monospace',
                fontSize: '14px',
                fontWeight: 400
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-6 py-16">
        <h1 
          className="text-5xl font-bold mb-16"
          style={{ 
            color: '#2C3831',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '48px',
            fontWeight: 500,
            lineHeight: '1.2'
          }}
        >
          Youth Startup Forum
        </h1>

        {/* Listen On Section */}
        <Section title="LISTEN ON:" content="LinkedIn" />

        {/* Info Section */}
        <Section title="INFO" content="tba" />
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex justify-between items-end text-xs">
          <div className="flex space-x-8">
            {[
              { label: 'Management:', value: 'tbd' },
              { label: 'email:', value: 'korea@youthstartupforum.com' },
              { label: 'linkedin:', value: 'tba' },
            ].map((item, idx) => (
              <div key={idx}>
                <div style={footerTextStyle}>{item.label}</div>
                <div style={footerTextStyle}>{item.value}</div>
              </div>
            ))}
          </div>

          <div className="text-right">
            <div style={footerTextStyle}>Rights:</div>
            <div style={footerTextStyle}>All rights reserved</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div className="mb-12">
      <h2 
        className="text-sm font-normal mb-4"
        style={{ 
          color: '#2C3831',
          fontFamily: 'Source Code Pro, monospace',
          fontSize: '14px',
          fontWeight: 400,
          letterSpacing: '0.1em'
        }}
      >
        {title}
      </h2>
      <div 
        className="text-base"
        style={{ 
          color: '#2C3831',
          fontFamily: 'Source Code Pro, monospace',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '1.5'
        }}
      >
        {content}
      </div>
    </div>
  );
}

const footerTextStyle: React.CSSProperties = {
  color: '#2C3831',
  fontFamily: 'Source Code Pro, monospace',
  fontSize: '11px',
  fontWeight: 400,
  lineHeight: '1.5',
};
