import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";

const TMDB_API_KEY = "83cfc3c5d55e36a54b344a1b5a633bbc";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  if (!movie) return <div className="movie-details-container">Загрузка...</div>;

  return (
    <div className="movie-details-container">
      <div className="movie-details-card">
        <div className="movie-details-left">
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-details-poster"
            />
          )}
        </div>
        <div className="movie-details-info">
          <h1>{movie.title}</h1>
          <p>
            <strong>Описание:</strong> {movie.overview}
          </p>
          <p>
            <strong>Рейтинг:</strong> {movie.vote_average}
          </p>
          <p>
            <strong>Дата релиза:</strong> {movie.release_date}
          </p>

          {movie.imdb_id && (
            <a
              href={`https://www.imdb.com/title/${movie.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="movie-details-link"
            >
              Смотреть на IMDb
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
