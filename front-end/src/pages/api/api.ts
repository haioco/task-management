import axios, { AxiosError } from "axios";

// @ts-ignore
import {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from 'next';
import Router from "next/router";
import Cookies from "js-cookie";

const isServer = () => {
  return typeof window === "undefined";
}

let accessToken = "";
let context = <GetServerSidePropsContext>{};
const baseURL = '127.0.0.1:8000/api/';

export const setAccessToken = (_accessToken: string) => {
  accessToken = _accessToken
}

export const getAccessToken = () => (accessToken)

export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
}


export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // to send cookie
})

api.interceptors.request.use((config:any) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${'23'}`
  }

  if (isServer() && context?.req?.cookies) {

    config.headers.Cookie = `'Bearer' + ${Cookies.get('accessToken')};`
  }
  
return config;
});

api.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    // check conditions to refresh token
    if (error.response?.status === 401 && !error.response?.config?.url?.includes("auth/refresh")
      && !error.response?.config?.url?.includes("signin")) {
      alert('no auth')
      
return "no auth";
    }
    
return Promise.reject(error);
  }
)

const fetchingToken = false;
let subscribers: ((token: string) => any)[] = [];

const onAccessTokenFetched = (token: string) => {
  subscribers.forEach((callback) => callback(token));
  subscribers = [];
}

const addSubscriber = (callback: (token: string) => any) => {
  subscribers.push(callback)
}

// const refreshToken = async (oError: AxiosError) => {
//
//   try {
//     const { response } = oError;
//
//     // create new Promise to retry original request
//     const retryOriginalRequest = new Promise((resolve) => {
//       addSubscriber((token: string) => {
//         // @ts-ignore
//         response!.config.headers['Authorization'] = `Bearer ${token}`
//         resolve(axios(response!.config))
//       })
//     })
//
//     // check whether refreshing token or not
//     if (!fetchingToken) {
//
//       fetchingToken = true;
//
//       // refresh token
//       const { data } = await api.post('/api/v1/auth/refresh')
//       // check if this is server or not. We don't wanna save response token on server.
//       if (!isServer) {
//         setAccessToken(data.accessToken);
//       }
//       // when new token arrives, retry old requests
//       onAccessTokenFetched(data.accessToken)
//     }
//     return retryOriginalRequest
//   } catch (error) {
//     // on error go to login page
//     if (!isServer() && !Router.asPath.includes('/login')) {
//       Router.push('/login');
//     }
//     if (isServer()) {
//       context.res.setHeader("location", "/login");
//       context.res.statusCode = 302;
//       context.res.end();
//     }
//     return Promise.reject(oError);
//   } finally {
//     fetchingToken = false;
//   }
// }
