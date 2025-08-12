import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <h1 className="logo">SWW</h1>
      </Link>
      <nav>
        <Link to="/games">Games</Link>
        <Link to="/movies">Movies and TV Series</Link>
      </nav>
    </div>
  );
}

export default Header;
