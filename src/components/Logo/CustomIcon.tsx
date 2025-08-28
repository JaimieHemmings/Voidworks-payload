import React from 'react'

const CustomIcon: React.FC = () => {
  return (
    <div className="custom-icon">
      {/* Replace with your own icon/favicon */}
      {/* <img
        src="/favicon.svg" // Replace with your icon path
        alt="Your Site Icon"
        style={{
          width: '24px',
          height: '24px',
        }}
      /> */}
      {/* Or use a simple colored square */}
      <div
        style={{
          width: '24px',
          height: '24px',
          backgroundColor: '#ff6b6b', // Your brand color
          borderRadius: '4px',
        }}
      />
    </div>
  )
}

export default CustomIcon
