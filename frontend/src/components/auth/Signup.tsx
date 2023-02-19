import { ChangeEvent, useState } from "react";
import axios from 'axios'


export interface ISignupCredentials {
    email: string,
    password: string,
    repeatPassword: string
}

export default function Signup () {
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
        e.preventDefault()
        console.log('signup data:', signupCredentials)
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
                value={signupCredentials.email || ''}
                onChange={handleInputChange}
                name='email'
            />
            <input
                type='password'
                placeholder='Password'
                value={signupCredentials.password || ''}
                onChange={handleInputChange}
                name='password'
            />
            <input
                type='password'
                placeholder='Repeat Password'
                value={signupCredentials.repeatPassword || ''}
                onChange={handleInputChange}
                name='repeatPassword'
            />
            <button>Signup</button>
        </form>
    </>
  );
}
