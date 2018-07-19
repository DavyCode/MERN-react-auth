import { AUTH_FAIL, AUTH_START, AUTH_SUCCESS} from '../actions/types'

const initialState = {
  token: null,
  errors: null,
  loading: false, 
  message: null,
  success: false,
  userData: null
} 

const authStart = (state, action) => {
  return {
    ...state,
    errors: null,
    loading: true
  }
}

const authSuccess = (state, action) => {
  return {
    ...state,
    errors: null,
    loading: false,
    success: true,
    ...action.payload
  }
}

const authFail = (state, action) => {
  return {
    ...state,
    loading: false,
    ...action.payload.response.data 
    // message: action.payload.response.data.message,
    // success: action.payload.response.data.success
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START: return authStart(state, action)
    case AUTH_SUCCESS: return authSuccess(state, action)
    case AUTH_FAIL: return authFail(state, action)  
    default:
      return state
  }
} 


