import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalModalContext } from "../../context/Modal";
import toast from "react-hot-toast";
import "./MovieDetail.scss";
import { getMovie } from "../../actions/movie";
import { Movie as MovieInterface } from "../../interface/Movie.interface";
import { getDirector } from "../../actions/director";
type movieWrapperType = {
  MovieWrapper: {
    [key: string]: string;
  };
};

const toastStyle = {
  style: {
    borderRadius: "10px",
    background: "#333",
    color: "#fff",
  },
};

const MovieDetail = () => {
  const { setVisible, setContent } = useContext<any>(GlobalModalContext);
  const [movie, setMovie] = useState<MovieInterface | null>(null);

  const [isFav, setIsFav] = useState<boolean>(false);
  const [styles, setStyles] = useState<movieWrapperType>({
    MovieWrapper: {
      paddingTop: "50vh",
      backgroundSize: "cover",
    },
  });
  const { id } = useParams();

  useEffect(() => {
    setStyles({
      MovieWrapper: {
        ...styles.MovieWrapper,
        backgroundImage: `url(${movie?.image})`,
      },
    });
  }, [movie, styles]);

  useEffect(() => {
    const fav = localStorage.getItem("fav")?.includes(movie?._id)
      ? true
      : false;

    setIsFav(fav);
  }, [movie]);

  const fetchMovie = async (id: string) => {
    const movie = await getMovie(id);
    setMovie(movie);
  };

  const fetchDirector = async (id: string) => {
    const director = await getDirector(id);
    setContent(director);
  };

  useEffect(() => {
    id && fetchMovie(id);
  }, [id]);

  return (
    <div>
      <div style={{ position: "relative", ...styles.MovieWrapper }}>
        <div className="movieDetail__movieInfo">
          <div style={{ display: "flex" }}>
            <img
              className="movie__poster"
              src={`${movie?.image}`}
              alt={movie?.name}
            />
            <div style={{ marginLeft: "2rem" }}>
              <h5>{movie?.genre}</h5>
              <p
                role="button"
                tabIndex={0}
                onClick={() => {
                  setVisible("block");
                  fetchDirector(movie?.director?._id);
                }}
                style={{ cursor: "pointer" }}
              >
                {movie?.director?.name}
              </p>
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
                    toast.success("Removed from favourites!", toastStyle);
                  }}
                  className="movieDetail__favouriteButton"
                >
                  Favourite
                </button>
              ) : (
                <button
                  onClick={() => {
                    localStorage.setItem(
                      "fav",
                      `${localStorage.getItem("fav")}, ${movie?._id}`
                    );
                    setIsFav(true);
                    toast.success("Added as favourite!", toastStyle);
                  }}
                  className="movieDetail__favouriteButton"
                >
                  Add to favourite
                </button>
              )}
            </div>
          </div>

          <div>
            <h2>{movie?.name}</h2>
            <p>{movie?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetail;