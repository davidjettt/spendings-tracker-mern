import Login from "../auth/Login";

export interface ISplashProps {
}

export default function Splash ({setShowNavBar}: any) {
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
            <Login setShowNavBar={setShowNavBar} />
    </div>
    </>
  );
}
