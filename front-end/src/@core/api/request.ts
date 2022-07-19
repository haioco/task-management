import {appServerLocal, appServer} from './AppUrl'
import axios from "axios";


const Request = axios.create({
  baseURL: appServerLocal,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Content-Type': 'application/json',
  }
})

export default Request
