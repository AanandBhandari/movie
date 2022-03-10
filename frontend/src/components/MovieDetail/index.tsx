import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context";
import toast from "react-hot-toast";
import "./MovieDetail.scss";
import { getMovie } from "../../actions/movie";
import { Movie as MovieInterface } from "../../interface/Movie.interface";
import { getDirector } from "../../actions/director";
import Movie from "../Movie";

const toastStyle = {
  style: {
    borderRadius: "10px",
    background: "#333",
    color: "#fff",
  },
};

const MovieDetail = () => {
  const { setVisible, setContent, movies } = useContext<any>(Context);
  const [movie, setMovie] = useState<MovieInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [filtredMovies, setFiltredMovies] = useState<MovieInterface[]>([]);

  const [isFav, setIsFav] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    const fav = localStorage.getItem("fav")?.includes(movie?._id)
      ? true
      : false;

    setIsFav(fav);
  }, [movie]);

  const fetchMovie = async (id: string) => {
    setLoading(true);
    const movie = await getMovie(id);
    setMovie(movie);
    setFiltredMovies(
      movies.filter((movie: MovieInterface) => movie._id !== id)
    );
    setLoading(false);
  };

  const fetchDirector = async (id: string) => {
    const director = await getDirector(id);
    setContent(director);
  };

  useEffect(() => {
    id && fetchMovie(id);
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="movieDetail__movieInfo">
        <div style={{ display: "flex" }}>
          <img
            className="movie__poster"
            src={`${movie?.image}`}
            alt={movie?.name}
          />
          <div className="movie__sideInfo">
            <h2>{movie?.name}</h2>
            <h4>{movie?.genre}</h4>
            <p
              role="button"
              tabIndex={0}
              onClick={() => {
                setVisible("block");
                fetchDirector(movie?.director?._id);
              }}
            >
              {movie?.director?.name}
            </p>
          </div>
        </div>

        <div>
          <p>{movie?.description}</p>
          {isFav ? (
            <button
              onClick={() => {
                const newFav: string | undefined = localStorage
                  .getItem("fav")
                  ?.split(",")
                  .filter((id) => {
                    return id.trim() !== movie?._id;
                  })
                  .join(",");

                newFav && localStorage.setItem("fav", newFav);
                setIsFav(false);
                toast.success("Removed from Favourites", toastStyle);
              }}
              className="movieDetail__favouriteButton"
            >
              FAVOURITE
            </button>
          ) : (
            <button
              onClick={() => {
                localStorage.setItem(
                  "fav",
                  `${localStorage.getItem("fav")}, ${movie?._id}`
                );
                setIsFav(true);
                toast.success("Added To Favourite", toastStyle);
              }}
              className="movieDetail__favouriteButton"
            >
              ADD TO FAVOURITE
            </button>
          )}
        </div>
        {filtredMovies.map((movie: MovieInterface) => (
          <div key={movie._id} className="movieDetail__similarMovies">
            <Movie movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default MovieDetail;
