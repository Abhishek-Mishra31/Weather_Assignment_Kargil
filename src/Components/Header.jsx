import React from "react";

function Header() {
  return (
    <div>
      <nav style={{ display: "flex", gap: "50px" }}>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </div>
  );
}

export default Header;
