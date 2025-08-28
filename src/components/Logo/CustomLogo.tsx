import React from 'react'

const CustomLogo: React.FC = () => {
  return (
    <div className="custom-logo">
      {/* Replace with your own logo */}
      {/* <img
        src="/your-logo.svg" // Replace with your logo path
        alt="Your Site Logo"
        style={{
          maxWidth: '200px',
          height: 'auto',
        }}
      /> */}
      {/* Or use text-based logo */}
      <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>VoidWorks</span>
    </div>
  )
}

export default CustomLogo
