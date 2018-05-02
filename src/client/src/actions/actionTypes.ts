enum ActionTypes {
    AUTH_SUCCESS = "AUTH_SUCCESS",
    AUTH_FAIL = "AUTH_FAIL",
    AUTH_LOGOUT = "AUTH_LOGOUT",
    AUTH_ACCESS_TOKEN_UPDATES="AUTH_ACCESS_TOKEN_UPDATES",
    AUTH_REFRESH_TOKEN_UPDATES="AUTH_REFRESH_TOKEN_UPDATES",
    AUTH_UPDATE_ACCESS_TOKEN="AUTH_UPDATE_ACCESS_TOKEN",

    LOADING_STARTS="LOADING_STARTS",
    LOADING_ENDS="LOADING_ENDS",
    LOADING_CLEAR="LOADING_CLEAR"
}

export default ActionTypes;

export interface IAction {
    type:ActionTypes;
}