import { LOGIN } from "../types/authTypes";

const initialState = {
    authenticated: false,
    role: null,
    user: null
}

export default function authReducer (state = initialState, action){
    switch (action.type) {
        case LOGIN:
            return {...state};    
        default:
            return state;
    }
}