import { appServerLocal } from './AppUrl'
import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import nookies from 'nookies'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const getToken = () => 'Bearer ' + Cookies.get('accessToken')
const isServer = () => typeof window === 'undefined'

console.log('gettoken', getToken())

const PrivateRequest = (ctx?: any) => {
  if (ctx) {
    const cookies = nookies.get(ctx)
    const getCtxToken = cookies.accessToken
    const handleToken = 'Bearer ' + getCtxToken
    const axiIns = axios.create({
      baseURL: appServerLocal,
      headers: {
        Authorization: handleToken,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json',
      },
      withCredentials: true
    })

    axiIns.interceptors.request.use(
      (config: any) => {
        if (getCtxToken) {
          config.headers.Authorization = `Bearer ${getCtxToken}`
        }
        if (isServer() && getCtxToken) {
          config.headers.Cookie = `'Bearer' + ${getCtxToken};`
        }

        return config
      },
      error => {
        console.log('err from request')

        return Promise.reject(error)
      }
    )

    axiIns.interceptors.response.use(
      response => {
        return response
      },
      (error: AxiosError) => {
        console.log('err ins', error.response)
        if (error.response?.status === 401 && 403) {
          toast.error('خطا در احراز هویت')
          console.log('get status 401 || 403', error.response)
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const router = useRouter()
          router.push('/login')
          localStorage.clear()
        }
        if (error.response?.status === 500) {
          console.log('get status 500', error.response)
          toast.error('درخواست مورد نظر یافت نشد | 500')
        }

        return Promise.reject(error)
      }
    )

    return axiIns
  } else {
    const axiIns = axios.create({
      baseURL: appServerLocal,
      headers: {
        Authorization: getToken()
      },
      withCredentials: true
    })
    axiIns.interceptors.request.use(
      (config: any) => {
        if (getToken) {
          config.headers.Authorization = `${getToken()}`
        }

        return config
      },
      error => {
        console.log('err from request')

        return Promise.reject(error)
      }
    )

    axiIns.interceptors.response.use(
      response => {
        return response
      },
      (error: AxiosError) => {
        console.log('err ins', error.response)
        if (error.response?.status === 401 && 403) {
          toast.error('خطا در احراز هویت | 401 -403 ')
          console.log('get status 401 || 403', error.response)
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const router = useRouter()
          router.push('/login')
          localStorage.clear()
        }
        if (error.response?.status === 404) {
          toast.error('آدرس مورد نظر یافت نشد | 404')
        }
        if (error.response?.status === 500) {
          console.log('get status 500', error.response)
          toast.error('درخواست مورد نظر یافت نشد | 500')
        }
        if (error.response?.status === 429) {
          console.log('get status 429', error.response)
          toast.error('تعداد درخواست های شما بیشتر از حد مجاز است  | 429')
        }

        return Promise.reject(error)
      }
    )

    return axiIns
  }
}

export { getToken }
export default PrivateRequest
