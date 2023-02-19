import { useState, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IAxiosError } from "../../interfaces/IAxiosError";

interface ILoginCredentials {
    email: string,
    password: string
}

export default function Login () {
    let navigate = useNavigate()
    const [ loginCredentials, setLoginCredentials ] = useState<ILoginCredentials>({email: '', password: ''})
    const [ errors, setErrors ] = useState<string[]>([])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setLoginCredentials({
            ...loginCredentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>): void => {
        e.preventDefault()

        axios.post('/api/auth/login', loginCredentials)
            .then((user) =>{
                localStorage.setItem('token', user.data.token)
                navigate('/protected')
            })
            .catch((err: IAxiosError) => {
                setErrors([...err.response.data.errors])
            })
    }

  return (
    <>
        {errors && <div>
            {errors.map((err: string, idx: number) => (
                <div key={idx}>
                    {err}
                </div>
            ))}
        </div>}
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Email'
                value={loginCredentials.email || ''}
                onChange={handleInputChange}
                name='email'
            />
            <input
                type='password'
                placeholder='Password'
                value={loginCredentials.password || ''}
                onChange={handleInputChange}
                name='password'
            />
            <button>Login</button>
        </form>
    </>
  );
}
