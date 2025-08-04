import { Routes, Route } from "react-router-dom";
import Movies from "./pages/Movies/movies";
import GameDetails from "./pages/GameDetails/gamedetails";
import MovieDetails from "./pages/MovieDetails/moviedetails";
import Header from "./Components/Header/header";
import "./App.css";
import Home from "./Pages/Home/home";
import Games from "./Pages/Games/games";

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
