import { GenericState, createGenericSlice } from "../../../app/store/genericSlice"
import { Follow } from "../profile"

type State = {
    data: Follow[]
}

const initialState: State = {
    data: []
}


export const followSlice = createGenericSlice({
    name: 'follow',
    initialState: initialState as GenericState<Follow[]>,
    reducers: {}
});


export const actions = followSlice.actions