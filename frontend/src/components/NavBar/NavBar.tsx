import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { useTheme } from "../../context/ThemeContext";
import lightIcon from '../../assets/lightActiveIcon.svg'
import darkIcon from '../../assets/darkActiveIcon.svg'
import logoutIcon from '../../assets/logoutIcon.svg'
import '../../index.css'

interface INavbarProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NavBar ({ setIsLoggedIn }: INavbarProps) {
    let navigate = useNavigate()
    const { setCurrentUser } = useCurrentUser()
    // const { theme, setTheme } = useTheme()
    const [ theme, setTheme ] = useState(localStorage.getItem('theme'))

    const handleLogout = (): void => {
        localStorage.removeItem('currentUser')
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
            className="nav-bar flex flex-col items-center w-[5%] bg-offWhite dark:bg-transctionsDarkMode dark:border-ray75"
        >
            <div
                className="flex flex-col h-[20%] justify-evenly"
            >
                <button
                    className="theme-btn"
                    onClick={handleThemeChange}
                >
                    {/* {theme === 'light'? 'Dark mode' : 'Light mode'} */}
                    {
                        theme === 'light' ?
                            <img className="w-[50px]" src={darkIcon} alt='dark icon' />
                        :
                            <img className="w-[50px]" src={lightIcon} alt='light icon' />
                    }
                </button>
                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    <img className="logout-icon" src={logoutIcon} alt='logout' />
                </button>
            </div>
        </nav>
  );
}
