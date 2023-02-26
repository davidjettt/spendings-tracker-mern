import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export interface INavBarProps {
}

export default function NavBar (props: INavBarProps) {
    let navigate = useNavigate()

    const handleLogout = (): void => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('id')
        // console.log('axios header', axios.defaults.headers.common['Authorization'])
        // delete axios.defaults.headers.common['Authorization']
        navigate('/')
    }
  return (
        <nav>
            <Link
                className="border rounded px-2"
                to='/dashboard'
            >
                Dashboard
            </Link>
            <Link
                className="border rounded px-2"
                to='/transaction-form'
            >
                Post a transaction
            </Link>
            <button
                className="border rounded px-2"
                onClick={handleLogout}
            >
                LOGOUT
            </button>
        </nav>
  );
}
