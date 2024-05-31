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
                state.data = action.payload.map(profile => {
                    const prevProfile = state.data.find(x => x.id === profile.id);
                    if (prevProfile) {
                        return {
                            ...prevProfile,
                            ...profile, // Update the profile properties
                            followerCount: profile.followerCount // Update the follower count
                        };
                    } else {
                        return profile;
                    }
                })
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
        },
        setFollowing: (state, action) => {
            state.data = state.data.map(profile => {
                if (profile.id !== action.payload.id) return profile;
                else {
                    return {
                        ...profile,
                        isFollowing: action.payload.isFollowing
                    };
                }
            });
        }
    }
})

export const actions = profileSlice.actions