import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Signup from "./components/auth/Signup";
import Charts from "./components/Charts/Charts";
import Splash from "./components/Splash/Splash";
import CurrentUserProvider from "./context/CurrentUserContext";
import TransactionForm from "./components/Transactions/TransactionForm";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const [ showNavBar, setShowNavBar ] = useState<boolean>(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get('/api/auth/currentUser', {
        headers: {
            Authorization: token
        }
    }).then(res => {
      console.log('HERE')
      setShowNavBar(true)
    }).catch(err => {
        console.log('err', err)
    })
},[])

  return (
    <div className="App">
      <CurrentUserProvider>
        <BrowserRouter>
          {showNavBar && <NavBar setShowNavBar={setShowNavBar} />}
          <Routes>
            <Route path='/' element={<Splash setShowNavBar={setShowNavBar} />}/>
            <Route path='/signup' element={<Signup />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/chart' element={<Charts />} />
            <Route path='/transaction-form' element={<TransactionForm />} />
            {/* <Route path='*' element={<Navigate to='/' replace />} */}
          </Routes>
        </BrowserRouter>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
