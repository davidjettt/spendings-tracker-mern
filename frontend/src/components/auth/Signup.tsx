import { ChangeEvent, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { IAxiosError } from "../../interfaces/IAxiosError";
import { Link } from "react-router-dom";

interface ISignupCredentials {
    email: string,
    password: string,
    repeatPassword: string
}

interface ISignupProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>

}

export default function Signup ({ setIsLoggedIn }: ISignupProps) {
    let navigate = useNavigate()
    const defaultSignupData: ISignupCredentials = {
        email: '',
        password: '',
        repeatPassword: ''
    }

    const [ signupCredentials, setSignupCredentials ] = useState<ISignupCredentials>(defaultSignupData)
    const [ errors, setErrors ] = useState<string[]>([])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setSignupCredentials({
            ...signupCredentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>): void => {
        setErrors([])
        e.preventDefault()
        console.log('signup data:', signupCredentials)

        if (signupCredentials.password !== signupCredentials.repeatPassword) {
            setErrors(['Passwords need to be the same'])
            return
        }

        axios.post('/api/auth/signup', signupCredentials)
            .then((user) => {
                setIsLoggedIn(true)
                localStorage.setItem('token', user.data.token)
                navigate('/dashboard')
            })
            .catch((err: IAxiosError) => {
                console.log('errors', [...err.response.data.errors])
                setErrors([...err.response.data.errors])
            })

    }


  return (
    <>
         <div
            className="signup-outer-container h-screen flex justify-center items-center dark:bg-bgDarkMode"
        >
            <div
                className="signup-inner-container flex flex-col items-center justify-center border p-5 h-[36em] w-[30em] rounded-md dark:bg-transctionsDarkMode"
            >
                <h1
                    className="signup-title text-4xl font-bold text-royalBlue font-sans w-[82%] align-top mb-10"
                >
                    Spendings Tracker
                </h1>
                <h2
                    className="text-2xl font-bold text-royalBlue font-sans w-[82%]"
                >
                    Create an account
                </h2>
                <div
                    className="signup-container w-[80%] h-[65%]"
                >
                    {errors && <div>
                        {errors.map((err: string, idx: number) => (
                            <div key={idx}>
                                {err}
                            </div>
                        ))}
                    </div>}
                    <form
                        className="signup-form h-[100%] flex flex-col justify-evenly"
                        onSubmit={handleSubmit}
                    >
                        <div
                            className="h-[75%] flex flex-col justify-evenly"
                        >
                            <label
                                htmlFor="signup-email"
                                className="signup-email-label flex flex-col font-sans dark:text-gray75"
                            >
                                Email
                            </label>
                            <input
                                id='signup-email'
                                className="signup-email shadow appearance-none border rounded-md focus:outline-none pl-2 py-3 font-sans mb-2"
                                type='text'
                                placeholder='Email'
                                value={signupCredentials.email || ''}
                                onChange={handleInputChange}
                                name='email'
                            />
                            <label
                                htmlFor="signup-pw"
                                className="signup-pw-label flex flex-col font-sans dark:text-gray75"
                            >
                                Password
                            </label>
                            <input
                                id='signup-pw'
                                className="signup-pw-input shadow appearance-none border rounded-md focus:outline-none pl-2 py-3 font-sans mb-2"
                                type='password'
                                placeholder='Password'
                                value={signupCredentials.password || ''}
                                onChange={handleInputChange}
                                name='password'
                            />
                            <label
                                htmlFor="repeat-pw"
                                className="repeat-pw-label flex flex-col font-sans dark:text-gray75"
                            >
                                Repeat Password
                            </label>
                            <input
                                id='repeat-pw'
                                className="repeat-pw-input shadow appearance-none border rounded-md focus:outline-none pl-2 py-3 font-sans"
                                type='password'
                                placeholder='Repeat Password'
                                value={signupCredentials.repeatPassword || ''}
                                onChange={handleInputChange}
                                name='repeatPassword'
                            />

                        </div>
                        <button
                            className="signup-btn border-royalBlue rounded-4xl py-2 bg-royalBlue text-offWhite font-san mt-1"
                        >
                            Signup
                        </button>
                    </form>
                </div>
                <span
                    className="sign-up-link-text mt-2"
                >
                Already have an account?
                <Link className="ml-1 text-royalBlue font-bold" to='/'>
                Log In
                </Link>
            </span>
            </div>
        </div>
    </>
  );
}
