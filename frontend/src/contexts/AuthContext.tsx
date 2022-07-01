import Router from "next/router";
import { parseCookies, setCookie } from "nookies";
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

export function AuthProvider({ children }: AuthProviderParams) {
    const [user, setUser] = useState<User>(null)
    const isAuthenticated = !user;

    const {'nextauth.token': token} = parseCookies();

    if(token){
    //    api.post('/user/authenticate', { email, password });
    //     const { permissions, roles, token, refreshToken } = response.data;

                // setUser({
                //     email,
                //     permissions,
                //     roles
                // })

                api.get('/registro').then(response => {
                    console.log(response)
               })

    }


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