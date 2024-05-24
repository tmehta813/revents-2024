import { PayloadAction } from "@reduxjs/toolkit"
import { AppEvent } from "../../app/types/event"
import { Timestamp } from "firebase/firestore"
import {GenericActions, GenericState, createGenericSlice } from "../../app/store/genericSlice"
import { auth } from "../../app/config/firebase"

type State = {
    events: AppEvent[]
}

const initialState: State = {
    events: []
}

export const eventSlice = createGenericSlice({
    name: 'events',
    initialState: initialState as unknown as GenericState<AppEvent[]>, 
    reducers: {
        success: {
            reducer: (state, action: PayloadAction<AppEvent[]>) => {
                state.data = action.payload
                state.status='finished'
            },
            prepare: (events: any) => {
                let eventArray: AppEvent[] = []
                eventArray = Array.isArray(eventArray) ? eventArray.concat(events) : [events];
                const mapped = eventArray.map((e: any) => {
                    const date = (e.date as Timestamp).toDate();
                    return { 
                        ...e, 
                        date: date.toISOString(),
                        isHost: auth.currentUser?.uid===e.hostUid,
                        isGoing: e.attendeeIds.includes(auth.currentUser?.uid)
                    };
                });
                return { payload: mapped }; // Return an object with the payload property
            },
        }
    },
});



export const actions = eventSlice.actions as GenericActions<AppEvent[]>