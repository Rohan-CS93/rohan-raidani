import React from 'react';

const ResumePage = () => {
  return (
    <div style={{ height: "100vh", padding: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <iframe
        src="/resume/Rohan-Raidani.pdf"  // Reference the file relative to the public folder
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    </div>
  );
};

export default ResumePage;
