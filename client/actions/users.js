export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const LOG_OUT_USER = "LOG_OUT_USER"

export function setCurrentUser(callback) {
  return (dispatch, getState, retry = true) => {
    dispatch({ type: SET_CURRENT_USER, user: { name: "LGS" } });
    if(callback){
      callback(true);
    }
  }
}
export function logOutUser() {
  return (dispatch, getState, retry = true) => {
    dispatch({ type: LOG_OUT_USER });
  }
}