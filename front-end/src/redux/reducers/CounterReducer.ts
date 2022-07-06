import {Icounter} from "../states/CounterStates";
import {INCREMENT} from "../types/CounterTypes";

const initionalState: Icounter = {
  counter: 0
}

const CounterReducer = (state = initionalState, action: any) => {
  switch (action.type) {
    case INCREMENT:
      return {...state, counter: action.payload.counter}

    default: return state
  }
}
export default CounterReducer
