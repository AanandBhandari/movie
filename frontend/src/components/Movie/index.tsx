import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalModalContext } from "../../context/Modal";
import type { MovieProps } from "./Move.type";
import "./Movie.scss";

const Movie = ({ movie }: MovieProps) => {
  const { setContent, setVisible } = useContext<any>(GlobalModalContext);
  return (
    <div>
      <Link to={`/${movie._id}`}>
        <img
          className="movie__poster"
          src={`${movie.image}`}
          alt={movie.name}
        />
      </Link>

      <h5 style={{ color: "gray" }}>{movie.genre}</h5>
      <p
        className="movie__directorName"
        role="button"
        tabIndex={0}
        onClick={() => {
          setVisible("block");
          setContent(movie.director);
        }}
      >
        {movie.director.name}
      </p>
    </div>
  );
};

export default Movie;
