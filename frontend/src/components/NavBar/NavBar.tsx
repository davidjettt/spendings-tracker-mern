import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { useTheme } from "../../context/ThemeContext";

interface INavbarProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NavBar ({setIsLoggedIn}: INavbarProps) {
    let navigate = useNavigate()
    const { setCurrentUser } = useCurrentUser()
    // const { theme, setTheme } = useTheme()
    const [ theme, setTheme ] = useState(localStorage.getItem('theme'))

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

    const handleThemeChange = () => {
        // setTheme(theme === 'light' ? 'dark' : 'light')
        setTheme(theme === 'light' ? 'dark' : 'light')
        localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light')
    }

    useEffect(() => {
        if (theme === 'dark') document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
    }, [theme])

  return (
        <nav
            className="nav-bar flex flex-col w-[5%] border-r border-borderLight bg-white dark:bg-transctionsDarkMode dark:border-ray75"
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
            <button
                className="theme-btn"
                onClick={handleThemeChange}
            >
                {theme === 'light'? 'Dark mode' : 'Light mode'}
            </button>
        </nav>
  );
}
