import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import Games from "./pages/Games/games";
import Movies from "./pages/Movies/movies";
import GameDetails from "./pages/GameDetails/gamedetails";
import MovieDetails from "./pages/MovieDetails/moviedetails";
import Header from "./Components/Header/header";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
}

export default App;
