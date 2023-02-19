import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Protected from "./components/auth/Protected";
import Signup from "./components/auth/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/protected' element={<Protected />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
