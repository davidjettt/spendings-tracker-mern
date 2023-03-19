import { Link } from "react-router-dom";
import Login from "../auth/Login";

export interface ISplashProps {
  isLoggedIn: boolean,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Splash ({ isLoggedIn, setIsLoggedIn }: ISplashProps) {
  return (
    <>
        <div
            className="h-screen flex justify-center items-center flex-col"
        >
            <h1
                className="text-4xl pb-10"
            >
                Spendings Tracker
            </h1>
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <Link to='/signup'>
              Sign up
            </Link>
    </div>
    </>
  );
}
