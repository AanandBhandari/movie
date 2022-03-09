import { AxiosResponse } from "axios";
import { GetDirector } from "../interface/Axios.interface";
import Requests from "../utils/Requests";

export const getDirector = async (id: string) => {
  try {
    const { data }: AxiosResponse<GetDirector> = await Requests.getDirector(id);
    return data.data;
  } catch (error) {
    console.log({ error });
    return null;
  }
};
