import {INCREMENT} from "../types/CounterTypes";


export const ADD_INCREMENT = ({number} : { number: number }) => ({ type: INCREMENT, payload : {number} })
