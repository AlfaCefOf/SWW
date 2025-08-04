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
  const [currentPageGames, setCurrentPageGames] = useState(1); // Пагинация для игр
  const [currentPageMedia, setCurrentPageMedia] = useState(1); // Пагинация для фильмов

  useEffect(() => {
    fetch(`${RAWG_API}&page=${currentPageGames}`)
      .then((res) => res.json())
      .then((data) => setGames(data.results || []));

    fetch(`${TMDB_API}&page=${currentPageMedia}`)
      .then((res) => res.json())
      .then((data) => setMedia(data.results || []));
  }, [currentPageGames, currentPageMedia]);

  // Фильтрация и сортировка игр
  const filteredGames = games
    .filter((game) => game.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) =>
      sortOrderGames === "az" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  // Фильтрация и сортировка медиа
  const filteredMedia = media
    .filter(
      (item) =>
        item.media_type === "movie" &&
        (item.title || item.name || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const nameA = a.title || a.name || "";
      const nameB = b.title || b.name || "";
      return sortOrderMedia === "az" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

  // Функция для загрузки следующих страниц
  const loadMoreGames = () => {
    setCurrentPageGames((prev) => prev + 1);
  };

  const loadMoreMedia = () => {
    setCurrentPageMedia((prev) => prev + 1);
  };

  return (
    <div className="app">
      {/* Поиск */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск игр и фильмов..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Сортировка игр */}
      <div className="search-box">
        <button onClick={() => setSortOrderGames("az")}>Игры: A-Z</button>
        <button onClick={() => setSortOrderGames("za")}>Игры: Z-A</button>
      </div>

      <h2 className="title">Новые Игры</h2>
      <div className="results">
        {filteredGames.map((game) => (
          <Link to={`/game/${game.id}`} key={game.id} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="card">
              <img
                src={game.background_image ? game.background_image : "/no-image.jpg"}
                alt={game.name}
              />
              <div className="card-info">
                <h3>{game.name}</h3>
                <p>Рейтинг: {game.rating}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Кнопка для загрузки дополнительных игр */}
      <div className="load-more-button">
        <button onClick={loadMoreGames}>Показать больше игр</button>
      </div>

      {/* Сортировка фильмов */}
      <div className="search-box">
        <button onClick={() => setSortOrderMedia("az")}>Фильмы: A-Z</button>
        <button onClick={() => setSortOrderMedia("za")}>Фильмы: Z-A</button>
      </div>

      <h2 className="title">Новые Фильмы и Сериалы</h2>
      <div className="results">
        {filteredMedia.map((item) => (
          <Link to={`/movie/${item.id}`} key={item.id} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="card">
              <img
                src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "/no-image.jpg"}
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

      {/* Кнопка для загрузки дополнительных фильмов */}
      <div className="load-more-button">
        <button onClick={loadMoreMedia}>Показать больше фильмов</button>
      </div>
    </div>
  );
}

export default Home;
