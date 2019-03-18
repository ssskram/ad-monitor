
// user
export interface user {
    email: string
    organization: string
    name: string
}

// message
export interface messsage {
    message: string
}


// event
export interface event {
    appName: string
    city: string
    country: string
    id: string
    ipAddress: string
    latitude: number
    longitude: number
    state: string
    time: string
    userEmail: string
    userName: string
}