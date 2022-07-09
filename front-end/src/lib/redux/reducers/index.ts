import {combineReducers} from 'redux'
import CounterReducer from "./CounterReducer";

export const RootReducer = combineReducers({
  CounterReducer: CounterReducer
})

export type RootReducer = ReturnType<typeof RootReducer | any>
