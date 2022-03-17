import React from "react";
import { useNavigate } from "react-router-dom";
import type { MovieProps } from "./Move.type";
import "./Movie.scss";

const Movie = ({ movie }: MovieProps) => {
  const navigate = useNavigate();
  return (
    <div className="movie" onClick={() => navigate(`/${movie._id}`)}>
      <img className="movie__poster" src={`${movie.image}`} alt={movie.name} />
      <div className="movie__info">
        <h2 style={{ marginTop: 4 }}>{movie.name}</h2>
        <h5 style={{ color: "gray" }}>{movie.genre}</h5>
        <p className="movie__directorName">{movie.director.name}</p>
      </div>
    </div>
  );
};

export default Movie;
