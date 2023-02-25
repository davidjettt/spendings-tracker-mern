import { createContext, useContext, useState } from 'react'

export interface ICurrentUserContext {
    id: string,
    email: string
}

export const CurrentUserContext = createContext<any>(null)

export function useCurrentUser() {
    return useContext(CurrentUserContext)
}

export default function CurrentUserProvider (props: any) {
    const [ currentUser, setCurrentUser ] = useState<ICurrentUserContext>({
        id: '',
        email: ''
    })

  return (
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
        {props.children}
    </CurrentUserContext.Provider>
  );
}
