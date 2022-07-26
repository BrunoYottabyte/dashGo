import { createContext, ReactNode, useContext, useState } from "react";


type FetchContextData = {
    setFetch: (id: string) => void;  

    stateFetch?: string;

}

 const FetchContext = createContext({} as FetchContextData);

interface FetchProviderProps {
    children: ReactNode;
}

export function FetchProvider({children}: FetchProviderProps){
    const [stateFetch, setStateFetch] = useState("");


    const setFetch = (id: string) => {
        setStateFetch(id)
    }

    return(
        <FetchContext.Provider value={{setFetch, stateFetch}}>
            {children}
        </FetchContext.Provider>
    )
}

export const useFetch = () => useContext(FetchContext)