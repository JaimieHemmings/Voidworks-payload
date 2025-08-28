import React from 'react'

const BeforeLogin: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      {/* Custom Logo Section */}
      <div style={{ marginBottom: '2rem' }}>
        <img
          src="/your-logo.svg" // Replace with your logo path
          alt="Your Company Logo"
          style={{
            maxWidth: '250px',
            height: 'auto',
            marginBottom: '1rem',
          }}
        />
        {/* Or use text-based branding */}
        {/* <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          color: '#333',
          margin: '0 0 1rem 0'
        }}>
          Your Company Name
        </h1> */}
      </div>

      <p>
        <b>Welcome to your dashboard!</b>
        {' This is where site admins will log in to manage your website.'}
      </p>
    </div>
  )
}

export default BeforeLogin
