import { createContext, ReactNode, useContext, useState } from 'react'

export interface ICurrentUserContext {
    id: string,
    email: string
}


type CurrentUser = {
    _id: string
    email: string
}

type CurrentUserContextType = {
    currentUser: CurrentUser | null
    setCurrentUser: (user: CurrentUser | null) => void
}

type CurrentUserProviderProps = {
    children: ReactNode
}

export const CurrentUserContext = createContext<CurrentUserContextType>({
    currentUser: null,
    setCurrentUser: (user: CurrentUser | null) => {}
})

export function useCurrentUser() {
    return useContext(CurrentUserContext)
}

export default function CurrentUserProvider ({children}: CurrentUserProviderProps) {
    const [ currentUser, setCurrentUser ] = useState<CurrentUser | null>(null)

  return (
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
        {children}
    </CurrentUserContext.Provider>
  );
}
