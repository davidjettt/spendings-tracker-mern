import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../context/CurrentUserContext";

interface INavbarProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NavBar ({setIsLoggedIn}: INavbarProps) {
    let navigate = useNavigate()
    const { setCurrentUser } = useCurrentUser()

    const handleLogout = (): void => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('id')
        setCurrentUser(null)
        // console.log('axios header', axios.defaults.headers.common['Authorization'])
        // delete axios.defaults.headers.common['Authorization']
        setIsLoggedIn(false)
        navigate('/')
    }
  return (
        <nav
            className="nav-bar flex flex-col w-[5%] border"
        >
            <Link
                className="border rounded px-2"
                to='/dashboard'
            >
                Dashboard
            </Link>
            <button
                className="logout-button border rounded px-2"
                onClick={handleLogout}
            >
                LOGOUT
            </button>
            <button>TOGGLE</button>
        </nav>
  );
}
