import { Director } from "./Director.interface";
import { Movie } from "./Movie.interface";
interface ServerData {
  status: string;
  message?: string;
}

export interface GetMovies extends ServerData {
  data: Movie[];
}

export interface GetMovie extends ServerData {
  data: Movie | null;
}

export interface GetDirector extends ServerData {
  data: Director | null;
}
