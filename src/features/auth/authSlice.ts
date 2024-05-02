import { createSlice } from "@reduxjs/toolkit"
import { User } from "./user"

type State = {
    authenticated: boolean
    currentUser: User | null
}

const initialState: State = {
    authenticated: false,
    currentUser: null
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signin: (state, action) => {
            state.authenticated = true;
            state.currentUser = {
                email: action.payload.email,
                photoURL: '/user.png'
            }

        },
        signout: (state) => {
            state.authenticated = false;
            state.currentUser = null
        }
    }
})

export const { signin, signout } = authSlice.actions