import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Protected from "./components/auth/Protected";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/protected' element={<Protected />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
