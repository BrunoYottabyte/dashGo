import axios, { AxiosError } from 'axios';
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { signOut, useAuth } from '../contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

export const setupClientApi = (ctx = undefined) => {
    const cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://localhost:3001',
        headers: {
            'Authorization': `Bearer ${cookies['nextauth.token']}`
        }
    })

    let isRefreshing = false;
    let failedRequestQueue = [];



    api.interceptors.response.use(response => {
        return response;
    }, (err: AxiosError) => {
        if (err.response.status === 401) {
            if (err.response.data?.code === 'token.expired') {
                const { 'nextauth.refreshToken': refreshToken } = parseCookies(ctx);
                const originalConfig = err.config;
                if (!isRefreshing) {
                    isRefreshing = true;
                    api.post('/user/refresh', { refreshToken }).then(response => {
                        const { refreshToken, token } = response.data;

                        setCookie(ctx, 'nextauth.token', token, {
                            maxAge: 60 * 60 * 24 * 30, //30 days;
                            path: '/'
                        })

                        setCookie(ctx, 'nextauth.refreshToken', refreshToken, {
                            maxAge: 60 * 60 * 24 * 30, // 1 month
                            path: '/'
                        })

                        api.defaults.headers['Authorization'] = `Bearer ${token}`;

                        failedRequestQueue.forEach(request => request.onSuccess(token));
                        failedRequestQueue = [];
                    }).catch(err => {
                        failedRequestQueue.forEach(request => request.onFailed(err));
                        failedRequestQueue = [];
                        if (process.browser) {
                            signOut();
                        }
                    }).finally(() => {
                        isRefreshing = false;
                    })
                }

                return new Promise((resolve, reject) => {
                    failedRequestQueue.push({
                        onSuccess: (token) => {
                            originalConfig.headers['Authorization'] = `Bearer ${token}`
                            resolve(api(originalConfig));
                        },
                        onFailed: (err) => {
                            reject(err);
                        }
                    })
                })

            } else {
                if (process.browser) {
                    signOut();
                } else {
                    return Promise.reject(new AuthTokenError())
                }
            }
        }

        return Promise.reject(err);
    })

    return api;
}

export const api = setupClientApi();