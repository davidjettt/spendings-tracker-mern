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
          className="splash-page-container h-screen flex justify-center items-center"
      >
        <div className="splash-page-inner-container flex flex-col items-center justify-center border px-5 h-[35em] w-[30em] rounded-md">
          <h1
              className="text-3xl font-bold text-royalBlue font-sans w-[82%] align-top mb-10"
          >
              Spendings Tracker
          </h1>
          <h2
            className="w-[82%] text-royalBlue text-2xl font-bold font-sans"
          >
            Sign in to Spendings Tracker
          </h2>
          <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          <span
            className="sign-up-link-text mt-2"
          >
            Don't have an account?
            <Link className="ml-1 text-royalBlue font-bold" to='/signup'>
              Sign up
            </Link>
          </span>

        </div>
      </div>
    </>
  );
}
