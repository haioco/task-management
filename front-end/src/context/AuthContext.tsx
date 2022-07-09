// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

import Cookies from 'js-cookie'

// ** Next Import
import { useRouter } from 'next/router'
import {useDispatch} from "react-redux";

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, RegisterParams, LoginParams, ErrCallbackType, UserDataType } from './types'
import Request from "../@core/api/request";
import PrivateRequest from "../@core/api/PrivateRequest";
import toast from "react-hot-toast";
import {USER_INFO} from "../lib/redux/actions/UserInfoAction";

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  // const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [user, setUser] = useState<any | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [isInitialized, setIsInitialized] = useState<boolean>(defaultProvider.isInitialized)

  // ** Hooks
  const router = useRouter()
  const dispatch = useDispatch()
  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      setIsInitialized(true)
      const StoredCookie = Cookies.get('accessToken')
      console.log('StoredCookie', !!StoredCookie)
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      if (storedToken) {
        setLoading(true)
        await PrivateRequest().get('user-info').then(async (res) => {
          console.log('user-info', res.data.user[0])
          setLoading(false)

          dispatch(USER_INFO(res.data.user[0]))
          setUser({ ...res.data.user[0]})
        }).catch((err) => {
          toast.error('خطا در احراز هویت')
          localStorage.removeItem('userData')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('accessToken')
          setUser(null)
          setLoading(false)
          const returnUrl = router.pathname
          const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
          router.replace(`/login/?returnUrl=${redirectURL}` as string)
        })

        // await axios
        //   .get(authConfig.userInfoEndpoint, {
        //     headers: {
        //       Authorization: storedToken
        //     }
        //   })
        //   .then(async response => {
        //     setLoading(false)
        //     setUser({ ...response.data.userData })
        //   })
        //   .catch(() => {
        //     localStorage.removeItem('userData')
        //     localStorage.removeItem('refreshToken')
        //     localStorage.removeItem('accessToken')
        //     setUser(null)
        //     setLoading(false)
        //   })
      } else {
        setLoading(false)
      }
    }
    initAuth()
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
     Request.post(authConfig.loginEndpoinrServer, params).then( async (res) => {
       console.log('auth res', res)
       console.log('auth accessToken', res.data.access_token)
       await Cookies.set('accessToken', res.data.access_token)
       await window.localStorage.setItem('accessToken', res.data.access_token)
       await window.localStorage.setItem('userData', JSON.stringify(res.data.user))

       // console.log('res data user role', res.data.user.role)
       setUser({ ...res.data.user })
       dispatch(USER_INFO(res.data.user))
       const returnUrl = router.query.returnUrl
       const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
       router.replace(redirectURL as string)
    }).catch((err) => {
      console.log('err', err)
       if (errorCallback) errorCallback(err)
     })


    ///ms auth
    // axios
    //   .post(authConfig.loginEndpoint, params)
    //   .then(async res => {
    //     console.log('login oparams', params)
    //     window.localStorage.setItem(authConfig.storageTokenKeyName, res.data.accessToken)
    //   })
    //   .then(() => {
    //     axios
    //       .get(authConfig.meEndpoint, {
    //         headers: {
    //           Authorization: window.localStorage.getItem(authConfig.storageTokenKeyName)!
    //         }
    //       })
    //       .then(async response => {
    //         const returnUrl = router.query.returnUrl
    //
    //         setUser({ ...response.data.userData })
    //         await window.localStorage.setItem('userData', JSON.stringify(response.data.userData))
    //
    //         const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
    //
    //         router.replace(redirectURL as string)
    //       })
    //   })
    //   .catch(err => {
    //     if (errorCallback) errorCallback(err)
    //   })
  }

  const handleLogout = () => {
    setUser(null)
    setIsInitialized(false)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch((err: { [key: string]: string }) => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
