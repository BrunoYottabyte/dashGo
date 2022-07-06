import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useToast } from "./ToastContext";

type User = {
    email: string;
    permissions: string[];
    roles: string[];
}

type SignInCredentials = {
    email: string;
    password: string;
}

type SignUpSubscription = {
    username: string;
    fullname: string;
    email: string;
    password: string;
}

type VerifyEmailData = {
    code: string | number;
}

type AuthContextData = {
    signIn: (credentials: SignInCredentials) => void;
    signUp: (subscription: SignUpSubscription) => void;
    verifyEmail: (code: VerifyEmailData) => void;
    showVerifyEmail?: boolean; 
    verifiedEmail: boolean;
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
    const [showVerifyEmail,setShowVerifyEmail] = useState(false);
    const [verifiedEmail,setVerifiedEmail] = useState(false);
    const isAuthenticated = !user;

    // Toast
    const {showToast} = useToast();


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
                
           
   
    }

    async function signUp({email, fullname, password, username}: SignUpSubscription){
            const response = await api.post('/user/', {email, fullname, password, username});
            // console.log(response);
            if(response.status === 200){
                setShowVerifyEmail(true);
            }else{
                setShowVerifyEmail(false);

            }
          
    }

    async function verifyEmail({code}: VerifyEmailData){
        try{
            const response = await api.post('/user/verifyEmail', {code});
            setVerifiedEmail(true)
            setTimeout(() => setShowVerifyEmail(false), 1500);
            setTimeout(() => {Router.reload(); setVerifiedEmail(false)}, 1500);
        }catch(err){
            // console.log(err)
            setVerifiedEmail(false);
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, signUp, user, isAuthenticated, showVerifyEmail, verifiedEmail, verifyEmail}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);