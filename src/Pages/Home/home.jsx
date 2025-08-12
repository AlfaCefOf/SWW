import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../src/App.css";

const RAWG_API = "https://api.rawg.io/api/games?key=22b6e3f254c248da83fc686e684928c3";
const TMDB_API = "https://api.themoviedb.org/3/trending/all/week?api_key=83cfc3c5d55e36a54b344a1b5a633bbc";

function Home() {
  const [games, setGames] = useState([]);
  const [media, setMedia] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrderGames, setSortOrderGames] = useState("az");
  const [sortOrderMedia, setSortOrderMedia] = useState("az");
  const [currentPageGames, setCurrentPageGames] = useState(1);
  const [currentPageMedia, setCurrentPageMedia] = useState(1);

  useEffect(() => {
    fetch(`${RAWG_API}&page=${currentPageGames}`)
      .then((res) => res.json())
      .then((data) => setGames(data.results || []));

    fetch(`${TMDB_API}&page=${currentPageMedia}`)
      .then((res) => res.json())
      .then((data) => setMedia(data.results || []));
  }, [currentPageGames, currentPageMedia]);

  const filteredGames = games
    .filter((game) => game.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) =>
      sortOrderGames === "az" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  const filteredMedia = media
    .filter(
      (item) =>
        item.media_type === "movie" &&
        (item.title || item.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const nameA = a.title || a.name || "";
      const nameB = b.title || b.name || "";
      return sortOrderMedia === "az" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

  return (
    <div className="app">
      {/* Панель поиска и сортировки */}
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Search for games and movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Игры */}
      <div className="section-header">
        <h2 className="title">New Games</h2>
        <div className="sort-buttons">
          <button
            className={sortOrderGames === "az" ? "active" : ""}
            onClick={() => setSortOrderGames("az")}
          >
            A-Z
          </button>
          <button
            className={sortOrderGames === "za" ? "active" : ""}
            onClick={() => setSortOrderGames("za")}
          >
            Z-A
          </button>
        </div>
      </div>

      <div className="results">
        {filteredGames.map((game) => (
          <Link to={`/game/${game.id}`} key={game.id} className="card">
            <div className="card-image">
              <img
                src={game.background_image || "/no-image.jpg"}
                alt={game.name}
              />
            </div>
            <div className="card-info">
              <h3>{game.name}</h3>
              <p>Rating: {game.rating}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="load-more-button">
        <button onClick={() => setCurrentPageGames((p) => p + 1)}>Show more games</button>
      </div>

      {/* Фильмы */}
      <div className="section-header">
        <h2 className="title">New Movies and TV Series</h2>
        <div className="sort-buttons">
          <button
            className={sortOrderMedia === "az" ? "active" : ""}
            onClick={() => setSortOrderMedia("az")}
          >
            A-Z
          </button>
          <button
            className={sortOrderMedia === "za" ? "active" : ""}
            onClick={() => setSortOrderMedia("za")}
          >
            Z-A
          </button>
        </div>
      </div>

      <div className="results">
        {filteredMedia.map((item) => (
          <Link to={`/movie/${item.id}`} key={item.id} className="card">
            <div className="card-image">
              <img
                src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "/no-image.jpg"}
                alt={item.title || item.name}
              />
            </div>
            <div className="card-info">
              <h3>{item.title || item.name}</h3>
              <p>Type: {item.media_type}</p>
              <p>Rating: {item.vote_average}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="load-more-button">
        <button onClick={() => setCurrentPageMedia((p) => p + 1)}>Show more movies</button>
      </div>
    </div>
  );
}

export default Home;
