import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./gamedetails.css";

const RAWG_API_KEY = "22b6e3f254c248da83fc686e684928c3";

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch(`https://api.rawg.io/api/games/${id}?key=${RAWG_API_KEY}`)
      .then((res) => res.json())
      .then((data) => setGame(data));
  }, [id]);

  if (!game)
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>Загрузка...</p>
    );

  return (
    <div className="game-details-container">
      <div className="game-details-card">
        <div className="left-block">
          {game.background_image && (
            <img
              src={game.background_image}
              alt={game.name}
              className="game-details-poster"
            />
          )}

          {game.stores?.some((store) => store.store_id === 1) ? (
            game.stores
              .filter((store) => store.store_id === 1)
              .map((store) => (
                <a
                  key={store.id}
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="game-details-button"
                >
                  Install (Steam)
                </a>
              ))
          ) : (
            <a
              href={`https://www.google.com/search?q=${game.name}+скачать+игру`}
              target="_blank"
              rel="noreferrer"
              className="game-details-button"
            >
              Install
            </a>
          )}
        </div>

        <div className="game-details-info">
          <h1>{game.name}</h1>
          <p>
            <strong>Description:</strong> {game.description_raw || "Нет описания"}
          </p>
          <p>
            <strong>Release date:</strong> {game.released}
          </p>
          <p>
            <strong>Rating:</strong> {game.rating} / 5
          </p>
          <p>
            <strong>Genres:</strong> {game.genres.map((g) => g.name).join(", ")}
          </p>
          <p>
            <strong>Platforms:</strong>{" "}
            {game.platforms.map((p) => p.platform.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
