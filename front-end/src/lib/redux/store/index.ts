import {createStore, applyMiddleware} from 'redux'
import {RootReducer} from "../reducers";
import thunk from 'redux-thunk'

export const CoreStore = createStore(
  RootReducer,
  applyMiddleware(thunk)
)
