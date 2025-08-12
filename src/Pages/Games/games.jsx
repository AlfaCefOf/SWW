import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./games.css"

function Games() {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=22b6e3f254c248da83fc686e684928c3&search=${query}`
    );
    const data = await res.json();
    setGames(data.results || []);
  };

  return (
    <div className="app">
      <h2 className="title">Search games</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter the game name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Find</button>
      </div>
      <div className="results">
        {games
          .filter((game) => game.background_image) // ← Показываем только если есть изображение
          .map((game) => (
            <Link
              to={`/game/${game.id}`}
              key={game.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="card">
                <img src={game.background_image} alt={game.name} />
                <div className="card-info">
                  <h3>{game.name}</h3>
                  <p>Rating: {game.rating}</p>
                  <p>
                    Platforms:{" "}
                    {game.platforms?.map((p) => p.platform.name).join(", ") ||
                      "N/A"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Games;
