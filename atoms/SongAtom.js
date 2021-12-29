import { atom } from 'recoil'
export const currentTrackIdState = atom({
    key: "currentTrackIdState", //unique id 
    // respect to other atoms/selector
    default: null, //defual value
})
export const isPlayingState = atom({
    key: "isPlayingState",
    default: false,
})