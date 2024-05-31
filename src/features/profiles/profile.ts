export type Profile = {
    id: string,
    photoURL: string | null
    createdAt: string
    description: string
    displayName: string
    followerCount: number
    followingCount: number
    isFollowing: boolean
}

export type Photo = {
    id: string
    name: string
    url: string 
}

export type Follow = {
    id: string
    displayName: string
    photoURL: string
}