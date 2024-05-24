export type AppEvent = {
    id: string
    title: string
    date: string
    category? : string 
    description: string
    city : string
    venue : string
    hostUid: string
    hostedBy: string
    isCancelled: boolean
    hostPhotoURL?: string
    attendees: Attendee[]
    attendeeIds: string[]
    isHost?: boolean
    isGoing?: boolean
}

export type Attendee = {
    id: string
    name: string
    displayName: string
    photoURL: string
}