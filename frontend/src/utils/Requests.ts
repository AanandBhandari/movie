import axios from "axios";

const director = {
  getDirectors: () => axios.get(`/api/director`),
  getDirector: (id: string) => axios.get(`/api/director/${id}`),
};

const movie = {
  getMovies: () => axios.get(`/api/movie`),
  getMovie: (id: string) => axios.get(`/api/movie/${id}`),
};

export default {
  ...director,
  ...movie,
};
