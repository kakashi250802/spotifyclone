import useSpotify from './../../hook/useSpotify/index';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from './../../atoms/SongAtom';
import useSongInfo from './../../hook/useSongInfo/index';
import { useEffect,useCallback,useState  } from 'react';
import {HeartIcon ,VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline"
import {FastForwardIcon,PauseIcon,PlayIcon,ReplyIcon,VolumeUpIcon,SwitchHorizontalIcon,RewindIcon} from "@heroicons/react/solid"
import {debounce} from "lodash"
function Player() {
    const spotifyApi = useSpotify()
    const { data: session,status} =useSession()
    const [currentTrackId,setCurrentTrackId] =useRecoilState(currentTrackIdState)  
    const [isPlaying,setIsPlaying] =useRecoilState(isPlayingState)
    const [volume,setVolume] =useState(50)
    const devices =null
    const songInfo = useSongInfo()
    useEffect(() => {
        if(spotifyApi.getAccessToken()&& !currentTrackId){
            // fetch song info
            fetchCurrentSong()
            setVolume(50);
        }
    },[currentTrackIdState,spotifyApi,session])
    
    const fetchCurrentSong =() => {
        if(!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then(data =>{
                console.log("now playing: ",data.body?.item?.id)
                setCurrentTrackId(data.body?.item?.id)
             spotifyApi.getMyCurrentPlaybackState().then((data)=>{
                setIsPlaying(data.body?.is_playing)
            })
            })

        }
    }
    const handlePlayPause = ()=>{
        spotifyApi.getMyCurrentPlaybackState().then((data)=>{
            if(data.body.is_playing){
                spotifyApi.pause();
                setIsPlaying(false)
            }else{
                spotifyApi.play()
                setIsPlaying(true)
            }
        })
    }
    //     useEffect(() => {
            
    //     spotifyApi.getMyDevices()
    //     .then(function(data) {
    //       let availableDevices = data.body.devices;
    //       devices=availableDevices
        
    //       console.log(devices[0].id);
    //     }, function(err) {
    //         console.log('Something went wrong!', err);
    //     });
    //     // Transfer a User's Playback
    //       spotifyApi.transferMyPlayback("870df361b77221d4d2cfd245f49cf19f615a2913")
    //       .then(function() {
    //         console.log('Transfering playback to ' + devices[0].id);
    //       }, function(err) {
    //         //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
    //         console.log('Something went wrong!', err);
    //       });
    // })

//     window.onSpotifyWebPlaybackSDKReady = () => {
//     const token = '[My Spotify Web API access token]';
//     const player = new Spotify.Player({
//       name: 'Web Playback SDK Quick Start Player',
//       getOAuthToken: cb => { cb(token); }
//     });
//   }
    useEffect(() => {
        if(volume >10 && volume < 100){
            debounceAdjustVolume(volume)
        }
    },[volume])
    const debounceAdjustVolume= useCallback(
        debounce((volume)=>{
            spotifyApi.setVolume(volume).catch((err)=>{})
        },100),[]
    )
    
    return (
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white
            grid grid-cols-3 text-xs md:text-base px-2 md:px-8
        ">
            {/* // left */}
            <div className="flex items-center space-x-4">
            <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images?.[0].url} alt="" />
            <div>
                <h3>{songInfo?.name}</h3>
                <p>{songInfo?.artists?.[0]?.name}</p>
            </div>
            </div>
            {/* <PlayerInfo /> */}
            {/* Center */}

            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button"/>
                <RewindIcon className="button" 
                onClick={()=>spotifyApi.skipToPrevious()} //not working
                />
                {isPlaying ? (
                    <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
                ):(
                    <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
                )}
                <FastForwardIcon
                     onClick={()=>spotifyApi.skipToNext()} //not working
                    className="button"
                />
                <ReplyIcon className="button" />
            </div>
        {/* Right */}
            <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                <VolumeDownIcon className="button" onClick={()=> volume >0 && setVolume(volume -10) }/>
                <input className="w-14 md:w-20" type="range" onChange={(e) => setVolume(Number(e.target.value))} value={volume} min={0} max={100} />
                <VolumeUpIcon className="button" onClick={()=> volume <100 && setVolume(volume +10) } />
                {/* <audio src={}></audio> */}
                 
            </div>
        </div>
    )
}

export default Player
