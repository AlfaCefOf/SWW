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
      <h2 className="title">Search for movies and TV series</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter the title of the movie or TV series"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Find</button>
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
                  <p>Type: {item.media_type}</p>
                  <p>Rating: {item.vote_average}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Movies;
