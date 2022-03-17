// import { useContext, useEffect } from "react";
// import { getMovies } from "./actions/movie";
// import { Context } from "./context";
import { Toaster } from "react-hot-toast";
import Axios from "axios";
import "./App.css";
// import MoviesList from "./components/MovieList";
// import MovieDetail from "./components/MovieDetail";
import Routes from "./routes";
import Modal from "./components/Modal";
import ContextProvider from "./context";
import { API_URL } from "./utils/Constant";
const App = () => {
  // const { setMovies } = useContext<any>(Context);
  // const fetchMovies = async () => {
  //   const movies = await getMovies();
  //   setMovies(movies);
  // };
  // useEffect(() => {
  //   fetchMovies();
  // }, []);
  Axios.defaults.baseURL = API_URL;
  return (
    <ContextProvider>
      <>
        <Modal />
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="App">
          <Routes />
        </div>
        {/* <Router basename="/">
          <Routes>
            <Route path="/" element={<MoviesList />} />
            <Route path="/:id" element={<MovieDetail />} />
          </Routes>
      </Router> */}
      </>
    </ContextProvider>
  );
};

export default App;
