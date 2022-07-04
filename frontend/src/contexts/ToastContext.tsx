
import { ReactNode, useContext, createContext, useEffect, useState, useCallback } from "react";

type ListSchema = {
    id: number;
    title: string;
    description: string;
    backgroundColor: string;
}

type ContextToastData = {
    list: ListSchema[];
    showToast: (type: string, title?: string, message?: string) => void;
    deleteToast: (id: number) => void;
}

const ToastContext = createContext({} as ContextToastData);

interface ToastProviderProps{
    children: ReactNode;
}

export function ToastProvider({children}: ToastProviderProps){
    const [list, setList] = useState([] as ListSchema[]);

    let toastProperties;

    useEffect(() => {
        const interval = setInterval(() => {
            if(list.length){
                deleteToast(list[0].id);
            }
        }, 3000);

        return () => {
            clearInterval(interval)
        }
    }, [list])

    const showToast = (type, title, message) => {

        switch(type){
            case 'success': 
                toastProperties = {
                id: list.length+1,
                title,
                description: message,
                backgroundColor: 'var(--green-500)',
           
                }
                break;

            case 'danger': 
                toastProperties = {
                id: list.length+1,
                title,
                description: message,
                backgroundColor: 'var(--red-500)',
           
                }
                break;

            case 'info': 
                toastProperties = {
                id: list.length+1,
                title,
                description: message,
                backgroundColor: 'var(--yellow-500)',
                }
                break;
            
            
        }
        setList([...list, toastProperties])
    }

    const deleteToast = useCallback(id => {     
        const tostListItem = list.filter(e => e.id !== id);
        setList(tostListItem);

    }, [list])

    return(
        <ToastContext.Provider value={{list, showToast, deleteToast}}>
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = () => useContext(ToastContext);