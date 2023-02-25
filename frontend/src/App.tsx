import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Protected from "./components/auth/Protected";
import Signup from "./components/auth/Signup";
import Charts from "./components/Charts/Charts";
import CurrentUserProvider from "./context/CurrentUserContext";

function App() {
  return (
    <div className="App">
      <CurrentUserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path='/protected' element={<Protected />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/chart' element={<Charts />} />
          </Routes>
        </BrowserRouter>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
