import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./movies.css"

function Movies() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=83cfc3c5d55e36a54b344a1b5a633bbc&query=${query}`
    );
    const data = await res.json();
    setResults(data.results || []);
  };

  return (
    <div className="app">
      <h2 className="title">Поиск фильмов и сериалов</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Введите название фильма или сериала"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Найти</button>
      </div>
      <div className="results">
        {results
          .filter((item) => item.poster_path) 
          .map((item) => (
            <Link
              to={`/movie/${item.id}`}
              key={item.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                />
                <div className="card-info">
                  <h3>{item.title || item.name}</h3>
                  <p>Тип: {item.media_type}</p>
                  <p>Рейтинг: {item.vote_average}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Movies;
