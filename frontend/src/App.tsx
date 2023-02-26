import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Protected from "./components/auth/Protected";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Signup from "./components/auth/Signup";
import Charts from "./components/Charts/Charts";
import CurrentUserProvider from "./context/CurrentUserContext";

function App() {
  return (
    <div className="App">
      <CurrentUserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />}/>
            <Route path='/signup' element={<Signup />} />
            <Route path='/protected' element={<Protected />} />
            <Route path='/chart' element={<Charts />} />
            {/* <Route path='*' element={<Navigate to='/' replace />} */}
          </Routes>
        </BrowserRouter>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
