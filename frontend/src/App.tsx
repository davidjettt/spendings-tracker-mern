import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Signup from "./components/auth/Signup";
import Charts from "./components/Charts/Charts";
import Splash from "./components/Splash/Splash";
import CurrentUserProvider from "./context/CurrentUserContext";
import TransactionForm from "./components/Transactions/TransactionForm";
import NavBar from "./components/NavBar/NavBar";
import AuthRoute from "./components/auth/AuthRoute";

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false)

//   useEffect(() => {
//     const token = localStorage.getItem('token')
//     axios.get('/api/auth/currentUser', {
//         headers: {
//             Authorization: token
//         }
//     }).then(res => {
//       setIsLoggedIn(true)
//     }).catch(err => {
//       setIsLoggedIn(false)
//     })
// },[])

  return (
    <div className="App h-[100vh]">
      <CurrentUserProvider>
        <BrowserRouter>
          {/* {showNavBar && <NavBar setShowNavBar={setShowNavBar} />} */}
          <Routes>
            <Route path='/' element={<Splash isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}/>
            <Route path='/signup' element={
              <AuthRoute isLoggedIn={isLoggedIn}>
                <Signup />
              </AuthRoute>
            }
            />
            <Route path='/dashboard' element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              </ProtectedRoute>
            }
            />
            <Route path='/chart' element={<Charts />} />
            <Route path='/transaction-form' element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <TransactionForm setIsLoggedIn={setIsLoggedIn} />
              </ProtectedRoute>
            }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
