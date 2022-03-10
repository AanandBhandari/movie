import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Axios from "axios";
import "./App.css";
import MoviesList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import Modal from "./components/Modal";
import ContextProvider from "./context";
import { API_URL } from "./utils/Constant";
const App = () => {
  Axios.defaults.baseURL = API_URL;
  return (
    <ContextProvider>
      <Router basename="/">
        <div className="App">
          <Modal />
          <Toaster position="bottom-center" reverseOrder={false} />
          <Routes>
            <Route path="/" element={<MoviesList />} />
            <Route path="/:id" element={<MovieDetail />} />
          </Routes>
        </div>
      </Router>
    </ContextProvider>
  );
};

export default App;
