
import { SET_CURRENT_USER, LOG_OUT_USER } from '../actions/users'

const INIT_STATE = {
  currentUser: null,
}

export default function users(state = INIT_STATE, action) {

  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.user }
    case LOG_OUT_USER:
      return { ...state, currentUser: null }
    default:
      return state;

  }
}

