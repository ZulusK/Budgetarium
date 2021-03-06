import {IState} from "@/models/State";
import * as Redux from "redux";

enum ActionTypes {
    AUTH_SUCCESS = "AUTH_SUCCESS",
    AUTH_LOGOUT = "AUTH_LOGOUT",
    AUTH_UPDATE_ACCESS_TOKEN = "AUTH_UPDATE_ACCESS_TOKEN",
    LOADING_STARTS = "LOADING_STARTS",
    LOADING_ENDS = "LOADING_ENDS",
    LOADING_CLEAR = "LOADING_CLEAR",
    ADD_ERROR = "ADD_ERROR",
    REMOVE_ERROR = "REMOVE_ERROR",
    TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR",
    WALLET_CREATE_SUCCESS = "WALLET_CREATE_SUCCESS",
    WALLET_DELETE_SUCCESS = "WALLET_DELETE_SUCCESS",
    WALLETS_LOADING_SUCCESS = "WALLETS_LOADING_SUCCESS",
    SELECT_WALLET = "SELECT_WALLET",
    FETCH_SUCCESS = "FETCH_SUCCESS",
    FETCH_FAILED = "FETCH_FAILED",
    DISABLE_SELECTED_WALLET = "DISABLE_SELECTED_WALLET",
    TRANSACTION_CREATE_SUCCESS = "TRANSACTION_CREATE_SUCCESS",
    TRANSACTION_DELETE_SUCCESS = "TRANSACTION_DELETE_SUCCESS",
    TRANSACTION_LOADING_SUCCESS = "TRANSACTION_LOADING_SUCCESS",
    DISABLE_SELECTED_TRANSACTION="DISABLE_SELECTED_TRANSACTION",
    SELECT_TRANSACTION = "SELECT_TRANSACTION",
    REMOVE_TRANSACTION_FROM_CURRENT_WALLET="REMOVE_TRANSACTION_FROM_CURRENT_WALLET",
}

export default ActionTypes;

export interface IActionArgs {
    type: ActionTypes;
}

type DispatchCallback = (dispatch: Redux.Dispatch<any, IState>, getState: () => IState) => any;


export abstract class IAction<T> {
    // protected dispatch: Redux.Dispatch<any, IState>;
    // protected getState: () => IState;

    // public constructor( readonly dispatch: Redux.Dispatch<any, IState>, readonly getState: () => IState) {
    // this.dispatch = dispatch;
    // this.getState = getState;
    // }

    public abstract execute(args: any, ...options: any[]): DispatchCallback;
}
