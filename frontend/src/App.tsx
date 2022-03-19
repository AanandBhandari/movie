import { Toaster } from "react-hot-toast";
import Axios from "axios";
import "./App.css";
import Routes from "./routes";
import Modal from "./components/Modal";
import ContextProvider from "./context";
import { API_URL } from "./utils/Constant";
const App = () => {
  Axios.defaults.baseURL = API_URL;
  return (
    <ContextProvider>
      <>
        <Modal />
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="App">
          <Routes />
        </div>
      </>
    </ContextProvider>
  );
};

export default App;
