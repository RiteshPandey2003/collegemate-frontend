import React from 'react';
import Header from './Header'; // Assuming your Header component is in a file named Header.js

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Layout;
