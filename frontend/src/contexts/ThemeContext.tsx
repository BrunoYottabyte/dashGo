import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Breakpoints = {
    sm?: boolean;
    md?: boolean;
    lg?: boolean;
}

type ThemeContextData = {
    toggleTheme: () => void;
    breakpoints: Breakpoints 
}

const ThemeContext = createContext({} as ThemeContextData);


interface ThemeProviderProps {
    children: ReactNode;

}

export default function ThemeProvider({children}: ThemeProviderProps){

        const [theme, setTheme] = useState(() => {
            if(typeof window !== 'undefined'){
                const mode = localStorage.getItem('@theme');
        
                if(mode){
                    return mode;
                }
        
                return 'theme-light';
            }
        });

        const [breakpoints, setBreakpoints] = useState(() => {
            if(typeof window !== 'undefined'){
                const sm = window.matchMedia("(max-width: 30em)").matches;
                    const md = window.matchMedia("(min-width: 30em) and (max-width: 48em)").matches;
                    const lg = window.matchMedia("(min-width: 48em)").matches;
    
                    return {
                        sm,
                        md,
                        lg
                    }
            }
        })
        
        useEffect(() => {
            window.addEventListener('resize', () => {
                    const sm = window.matchMedia("(max-width: 30em)").matches;
                    const md = window.matchMedia("(min-width: 30em) and (max-width: 48em)").matches;
                    const lg = window.matchMedia("(min-width: 48em)").matches;
    
                    setBreakpoints({
                        sm,
                        md,
                        lg
                    })
            })
        }, [])

        useEffect(() => {
            if(theme === 'theme-dark'){
               document.body.className = `${theme} active`
            }else{
               document.body.className = `${theme}`
            }
     }, [theme])
    
        function toggleTheme(){
            if(theme === 'theme-light'){
                localStorage.setItem('@theme', 'theme-dark');
                setTheme('theme-dark');
            }else{
                localStorage.setItem('@theme', 'theme-light');
                setTheme('theme-light');
            }
        }
    

    return(
        <ThemeContext.Provider value={{toggleTheme, breakpoints}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);