import {appServerLocal, appServer} from './AppUrl'
import axios from "axios";


const Request = axios.create({
  baseURL: appServerLocal
})

export default Request
