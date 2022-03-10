import React, { createContext, useState } from "react";
import { Movie } from "../interface/Movie.interface";

type Props = {
  children: JSX.Element;
};

export interface ContextType {
  visible: string;
  setVisible: React.Dispatch<any>;
  content: null | any;
  setContent: React.Dispatch<any>;
  movies: Movie[];
  setMovies: React.Dispatch<any>;
}

export const Context = createContext<null | ContextType>(null);

const ContextProvider = ({ children }: Props) => {
  const [visible, setVisible] = useState("none");
  const [content, setContent] = useState(null);
  const [movies, setMovies] = useState([]);

  return (
    <Context.Provider
      value={{ visible, setVisible, content, setContent, movies, setMovies }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
