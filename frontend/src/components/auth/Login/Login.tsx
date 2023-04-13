import { useState, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IAxiosError } from "../../../interfaces/IAxiosError";
import { useCurrentUser } from "../../../context/CurrentUserContext";

interface ILoginCredentials {
    email: string,
    password: string
}

interface ILoginProps {
    // isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Login ({ setIsLoggedIn }: ILoginProps) {
    let navigate = useNavigate()
    const { setCurrentUser } = useCurrentUser()
    const [ loginCredentials, setLoginCredentials ] = useState<ILoginCredentials>({email: '', password: ''})
    const [ errors, setErrors ] = useState<string[]>([])

    // Stores user credentials in state
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setLoginCredentials({
            ...loginCredentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>): void => {
        e.preventDefault()

        axios.post('/api/auth/login', loginCredentials)
        .then((response) =>{
            const user = {
                ...response.data,
                isLoggedIn: true
            }
            localStorage.setItem('currentUser', JSON.stringify(user))
            setCurrentUser(response.data)
            setIsLoggedIn(true)
            navigate('/dashboard')
        })
        .catch((err: IAxiosError) => {
            setErrors([...err.response.data.errors])
        })
    }

    const handleDemoLogin = (): void => {
        setLoginCredentials({
            email: 'demo@aa.io',
            password: 'benjaminbutton123'
        })
    }

  return (
    <>
        <div
            className="login-container w-[80%] h-[60%]"
        >
            <form
                className="login-form h-[100%] flex flex-col justify-evenly"
                onSubmit={handleSubmit}
            >
                <div
                    className="h-[52%] flex flex-col justify-evenly"
                >
                    <label
                        htmlFor="login-email"
                        className={`login-email-label flex flex-col font-sans ${errors.length > 0 ? 'text-red dark:text-red': 'text-black'} dark:text-gray75`}
                    >
                        Email {errors.length ? `- ${errors[0]}` : ''}
                    </label>
                    <input
                        id='login-email'
                        className={`login-email-input dark:bg-bgDarkMode dark:text-gray75 shadow appearance-none border dark:border-none rounded-md focus:outline-none pl-2 py-3 font-sans mb-2`}
                        type='text'
                        placeholder='Email'
                        value={loginCredentials.email || ''}
                        onChange={handleInputChange}
                        name='email'
                    />
                    <label
                        htmlFor="login-pw"
                        className={`login-pw-label flex flex-col font-sans ${errors.length > 0 ? 'text-red dark:text-red' : 'text-black'} dark:text-gray75`}
                    >
                        Password {errors.length ? `- ${errors[0]}` : ''}
                    </label>
                    <input
                        id='login-pw'
                        className={`login-pw-input dark:bg-bgDarkMode dark:text-gray75 shadow appearance-none border dark:border-none border-${errors?.length > 0 ? 'red-700' : 'black-500'} rounded-md focus:outline-none py-3 pl-2 font-sans`}
                        type='password'
                        placeholder='Password'
                        value={loginCredentials.password || ''}
                        onChange={handleInputChange}
                        name='password'
                    />
                </div>
                <button
                    className="login-btn border-royalBlue rounded-4xl py-2 bg-royalBlue text-offWhite font-sans"
                >
                    Login
                </button>
                <button
                    className="demo-btn border-royalBlue rounded-4xl py-2 bg-royalBlue text-offWhite font-sans"
                    onClick={handleDemoLogin}
                >
                    Demo Login
                </button>
            </form>
        </div>
    </>
  );
}
