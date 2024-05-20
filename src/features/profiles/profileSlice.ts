import { PayloadAction } from "@reduxjs/toolkit"
import { GenericState, createGenericSlice } from "../../app/store/genericSlice"
import { Profile } from "./profile"
import { Timestamp } from "firebase/firestore"

type State = {
    data : Profile[]
}


const initialState : State = {
    data : []
}


export const profileSlice = createGenericSlice({
    name: 'profiles',
    initialState: initialState as GenericState<Profile[]>,
    reducers: {
        success: {
            reducer: (state, action: PayloadAction<Profile[]>) => {
                state.data = action.payload;
                state.status = 'finished'
            },
            prepare: (profiles) => {
                const profileArray: Profile[] = Array.isArray(profiles) ? profiles : [profiles];
                const mapped = profileArray.map(profile => {
                    return {
                        ...profile,
                        createdAt: (profile.createdAt as unknown as Timestamp).toDate().toISOString()
                    };
                });
                return { payload: mapped };
            }
        }
    }
})

export const actions = profileSlice.actions