import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon,
    LogoutIcon
} from "@heroicons/react/outline"
import {signOut,useSession} from "next-auth/react"
import {useState,useEffect} from "react"
import {useRecoilState} from "recoil"
import useSpotify from './../../hook/useSpotify/index';
import { playlistIdState } from './../../atoms/PlaylistAtom';
function Sidebar() {
    const spotifyApi =useSpotify()
    const { data: session,status } = useSession()
    const [playlists,setPlaylists] = useState([])
    const [playlistId,setPlaylistId] = useRecoilState(playlistIdState);
    useEffect(()=>{
        if(spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then((data)=>{
                setPlaylists(data.body.items)
            })
        }
    },[session,spotifyApi])
    return (
        <div className="text-gray-500 p-5 text-xs border-r 
         border-gray-900 overflow-y-auto h-screen scrollbar-thin scrollbar scrollbar-thumb-gray-900 
        scrollbar-track-black sm:text-sm sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
                <div className="space-y-4">
                <button className="flex items-center space-x-2 hover:text-white" onClick={()=>signOut()}>
                    <LogoutIcon className="h-5 w-5" />
                    <p>Đăng xuất</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5"/>
                    <p>Trang Chủ</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="h-5 w-5"/>
                    <p>Tìm Kiếm</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="h-5 w-5"/>
                    <p>Thư viện</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900"/>
                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5"/>
                    <p>Tạo playlist</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5"/>
                    <p>Bài hát đã thích</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5"/>
                    <p>Tuyển tập của bạn</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900"/>
                
                {/* playlist */}
     

                {playlists.map((playlist)=>(
                    <p key={playlist.id} onClick={()=>setPlaylistId(playlist.id)} className="space-x-2 cursor-pointer hover:text-white">
                {playlist.name}
                </p>
                ))}
               <div className="pb-24"></div>
                
            </div>
        </div>
    )
}

export default Sidebar
