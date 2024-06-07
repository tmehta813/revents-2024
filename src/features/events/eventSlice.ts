import { PayloadAction, current } from "@reduxjs/toolkit"
import { AppEvent } from "../../app/types/event"
import { Timestamp } from "firebase/firestore"
import { GenericActions, GenericState, createGenericSlice } from "../../app/store/genericSlice"
import { auth } from "../../app/config/firebase"

type State = {
    events: AppEvent[],
    loadedInitial: boolean
}

const initialState: State = {
    events: [],
    loadedInitial: false
}

export const eventSlice = createGenericSlice({
    name: 'events',
    initialState: initialState as unknown as GenericState<AppEvent[]>,
    reducers: {
        success: {
            reducer: (state, action: PayloadAction<AppEvent[]>) => {
                if (current(state).data) {
                    state.data = removeDublicates([...action.payload,...current(state).data]);
                }
                else {
                    state.data = action.payload
                }
                state.status = 'finished'
                state.loadedInitial = true
            },
            prepare: (events: any) => {
                let eventArray: AppEvent[] = []
                eventArray = Array.isArray(eventArray) ? eventArray.concat(events) : [events];
                const mapped = eventArray.map((e: any) => {
                    const date = (e.date as Timestamp).toDate();
                    return {
                        ...e,
                        date: date.toISOString(),
                        isHost: auth.currentUser?.uid === e.hostUid,
                        isGoing: e.attendeeIds.includes(auth.currentUser?.uid)
                    };
                });

                return { payload: mapped };
            },
        }
    },
});


export const actions = eventSlice.actions as GenericActions<AppEvent[]>

function removeDublicates(events: AppEvent[]) {
    return Array.from(new Set(events
        .map(x => x.id)))
        .map(id => events.find(a => a.id === id) as AppEvent)
        .sort((a,b) => new Date(a?.date).getTime()-new Date(b.date).getTime())
}