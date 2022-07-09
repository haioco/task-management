import {Iuser} from "../states/UserState";
import {ADD_INFO} from "../types/UserActionType";

const inituinalState: Iuser = {}

const UserInfoReducer = (state = inituinalState, action: any) => {
  switch (action.type) {
    case ADD_INFO:
      console.log('action.payload.userInfo', action.payload)
      
return {...state,userInfo:action.payload}
    break
    default:
      return state
  }
}

export default UserInfoReducer
