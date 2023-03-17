import { Link } from "react-router-dom";
import Login from "../auth/Login";
import Signup from "../auth/Signup";

export interface ISplashProps {
}

export default function Splash () {
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
            <Login />
            <Link to='/signup'>
              Sign up
            </Link>
    </div>
    </>
  );
}
