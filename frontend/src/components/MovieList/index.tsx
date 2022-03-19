import { useContext } from "react";
import Movie from "../../components/Movie";
import { Context } from "../../context";
import { Movie as MovieInterface } from "../../interface/Movie.interface";
import "./MovieList.scss";
const MoviesList = () => {
  const { movies } = useContext<any>(Context);
  return (
    <div>
      {movies.map((movie: MovieInterface) => (
        <Movie key={movie._id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesList;
