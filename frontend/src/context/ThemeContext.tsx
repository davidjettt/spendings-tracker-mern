import { createContext, FC, ReactNode, useContext, useState } from 'react'

type Theme = 'light' | 'dark'
type ThemeContextType = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

type ThemeProviderProps = {
    children: ReactNode
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    setTheme: (theme: Theme) => {}
})

export function useTheme() {
    return useContext(ThemeContext)
}

export default function ThemeProvider ({children}: ThemeProviderProps) {
    const [ theme, setTheme ] = useState<Theme>('light')

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
