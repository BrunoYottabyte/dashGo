import Router from "next/router";
import { setCookie } from "nookies";
import { createContext, ReactNode, useContext, useState } from "react";
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

    async function signIn({ email, password }: SignInCredentials) {
    
            const { data } = await api.post('/user/authenticate', { email, password });

            if (data?.permissions) {
                
                const { permissions, roles, token, refreshToken } = data;

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
            }
   


    }

    return (
        <AuthContext.Provider value={{ signIn, user, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);