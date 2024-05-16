import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="200"
        height="200"
        fill="currentColor"
      >
        <path d="M12 1c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1-10h2v6h-2zm0 8h2v2h-2zm0-10h2v6h-2z" />
      </svg>
      <h1 style={{ fontSize: "4rem" }}>404</h1>
      <h3 style={{ fontSize: "2rem" }}>Not Found</h3>
      <Link to="/" style={{ textDecoration: "none", color: "blue" }}>Go back to home</Link>
    </div>
  );
};

export default NotFound;
