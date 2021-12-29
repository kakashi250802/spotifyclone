
import useSpotify from './../useSpotify/index';
import { useRecoilState } from 'recoil';
import { currentTrackIdState } from './../../atoms/SongAtom';
import { useState, useEffect } from 'react';
function useSongInfo() {
    const spotifyApi = useSpotify()
    const [curentIdTrack,setCurrentIdTrack] =useRecoilState(currentTrackIdState)  
    const  [songInfo,setSongInfo] = useState(null)
    useEffect(() => {
        const fetchSongInfo = async () =>{
            if(curentIdTrack){
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${curentIdTrack}`,
                    {
                        headers:{
                        Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                    }
                }
                ).then(res => res.json())
                setSongInfo(trackInfo)
            }
        }
        fetchSongInfo();
    },[curentIdTrack,spotifyApi])
    return songInfo;
}

export default useSongInfo
