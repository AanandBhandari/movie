import { useContext } from "react";
// import { getMovies } from "../../actions/movie";
import Movie from "../../components/Movie";
import { Context } from "../../context";
import { Movie as MovieInterface } from "../../interface/Movie.interface";
import "./MovieList.scss";
const MoviesList = () => {
  const { movies } = useContext<any>(Context);
  // const fetchMovies = async () => {
  //   const movies = await getMovies();
  //   setMovies(movies);
  // };
  // useEffect(() => {
  //   fetchMovies();
  // }, []);
  return (
    <div>
      {movies.map((movie: MovieInterface) => (
        <Movie key={movie._id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesList;
