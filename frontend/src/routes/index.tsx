import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import { getMovies } from "../actions/movie";
import { Context } from "../context";
import MoviesList from "../components/MovieList";
import MovieDetail from "../components/MovieDetail";
const Index = () => {
  const { setMovies } = useContext<any>(Context);
  const fetchMovies = async () => {
    const movies = await getMovies();
    setMovies(movies);
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  console.log("heloo");
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
};

export default Index;
