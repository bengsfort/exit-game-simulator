import { RealtimeUser } from "./types";

let uniqueId = "";
let userName = "";
let userConnected = false;

let participants = [] as RealtimeUser[];

// ID the websocket server gives us
export function setUniqueId(id: string) {
    uniqueId = id;
}

// The name the user has chosen for themselves
export function setUserName(name: string) {
    userName = name;
}

// Run once we have successfully connected to the websocket
export function setUserConnected(connected: boolean) {
    userConnected = connected;
}

// Run when server emits a participant left event
export function removeParticipant(id: string) {
    participants = participants.filter(participant => participant.id !== id);
}

// Run when server emits a new participant event
export function addParticipant(user: RealtimeUser) {
    // If the user exists, just replace them.
    // This won't do anything if they don't exist.
    removeParticipant(user.id);
    participants.push(user);
}

// Only run when joining/leaving a room; using server data
export function setParticipants(users: RealtimeUser[]) {
    participants = [...users];
}

export function getGlobalState() {
    return {
        uniqueId,
        userName,
        userConnected,
        participants,
    };
}
