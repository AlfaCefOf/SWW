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
        <Link to="/games">Игры</Link>
        <Link to="/movies">Фильмы и Сериалы</Link>
      </nav>
    </div>
  );
}

export default Header;
