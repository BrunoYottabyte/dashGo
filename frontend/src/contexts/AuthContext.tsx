import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
    email: string;
    permissions: string[];
    roles: string[];
}

type SignInCredentials = {
    email: string;
    password: string;
}

type AuthContextData = {
    signIn: (credentials: SignInCredentials) => void;
   
    user: User;
    isAuthenticated: boolean;
}

const AuthContext = createContext({} as AuthContextData)

type AuthProviderParams = {
    children: ReactNode;
}
let authChannel: BroadcastChannel;

export const signOut = () => {
    destroyCookie(undefined, 'nextauth.token');
    destroyCookie(undefined, 'nextauth.refreshToken');
    authChannel.postMessage('signOut');
    Router.push('/')
}


export function AuthProvider({ children }: AuthProviderParams) {
    const [user, setUser] = useState<User>(null)
    const isAuthenticated = !user;



    useEffect(() => {
        const {'nextauth.token': token} = parseCookies();
        if(token){
            api.get('/user/me').then(response => {
                const { permissions, roles, email } = response.data;
         
                    setUser({
                        email,
                        permissions,
                        roles
                    })
            });
            
        }
    }, [])


    
    useEffect(() => {
        authChannel = new BroadcastChannel('auth');
        authChannel.onmessage = (message) => {
            switch(message.data){
                case 'signOut': 
                   
                    Router.push('/');
                    break;
                case 'signIn': 
             
                    Router.push('/dashboard');
                    break;
                default: 
                    break;
            }
        }
    }, []) 

    async function signIn({ email, password }: SignInCredentials) {
        
            try{
                const response = await api.post('/user/authenticate', { email, password });
                
                const { permissions, roles, token, refreshToken } = response.data;

                setUser({
                    email,
                    permissions,
                    roles
                })

                setCookie(undefined, 'nextauth.token', token, {
                    maxAge: 60 * 60 * 24 * 30, //30 days
                    path: '/'
                })

                setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
                    maxAge: 60 * 60 * 24 * 30, //30 days
                    path: '/'
                })

                 api.defaults.headers['Authorization'] = `Bearer ${token}`;

                Router.push('/dashboard')

                authChannel.postMessage('signIn');
            
            }catch(err){
                console.log(err);
            }
   
    }

    return (
        <AuthContext.Provider value={{ signIn, user, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);