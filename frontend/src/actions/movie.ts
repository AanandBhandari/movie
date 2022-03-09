import { AxiosResponse } from "axios";
import { GetMovie, GetMovies } from "../interface/Axios.interface";
import Requests from "../utils/Requests";
export const getMovies = async () => {
  try {
    const { data }: AxiosResponse<GetMovies> = await Requests.getMovies();
    return data.data;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

export const getMovie = async (id: string) => {
  try {
    const { data }: AxiosResponse<GetMovie> = await Requests.getMovie(id);
    return data.data;
  } catch (error) {
    console.log({ error });
    return null;
  }
};
