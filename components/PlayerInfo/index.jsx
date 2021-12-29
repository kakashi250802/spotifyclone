// import spotifyApi from './../../lib/spotify';
// import { useSession } from 'next-auth/react';
// import { useRecoilState } from 'recoil';
// import { currentTrackIdState,isPlayingState } from './../../atoms/SongAtom';
// import { useState } from 'react';
// import useSongInfo from './../../hook/useSongInfo/index';
// import useSpotify from './../../hook/useSpotify/index';
// import { useEffect } from 'react';
// function PlayerInfo() {
//     const spotifyApi = useSpotify()
//     const { data: session,status} =useSession()
//     const [currentTrackId,setCurrentTrackId] =useRecoilState(currentTrackIdState)  
//     const [isPlaying,setIsPlaying] =useRecoilState(isPlayingState)
//     const [volume,setVolume] =useState(50)
//     const songInfo = useSongInfo()
//     useEffect(() => {
//         if(spotifyApi.getAccessToken()&& !currentTrackId){
//             // fetch song info
//             fetchCurrentSong()
//             setVolume(50);
//         }
//     },[currentTrackIdState,spotifyApi,session])
    
//     const fetchCurrentSong =() => {
//         if(!songInfo) {
//             spotifyApi.getMyCurrentPlayingTrack().then(data =>{
//                 console.log("now playing: ",data.body?.item?.id)
//                 setCurrentTrackId(data.body?.item?.id)
//             spotifyApi.getMyCurrentPlaybackState().then((data)=>{
//                 setIsPlaying(data.body?.is_playing)
//             })
//             })

//         }
//     }
//     return (
        
//             <div className="flex items-center space-x-4">
//             <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images?.[0].url} alt="" />
//             <div>
//                 <h3>{songInfo?.name}</h3>
//                 <p>{songInfo?.artists?.[0]?.name}</p>
//             </div>
//             </div> 
       
//     )
// }

// export default PlayerInfo
