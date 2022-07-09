import {combineReducers} from 'redux'
import CounterReducer from "./CounterReducer";
import UserInfoReducer from "./UserInfoReducer";

export const RootReducer = combineReducers({
  CounterReducer: CounterReducer,
  UserInfo: UserInfoReducer
})

export type RootReducer = ReturnType<typeof RootReducer | any>
