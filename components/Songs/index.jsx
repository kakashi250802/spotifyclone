import { playlistState } from './../../atoms/PlaylistAtom';
import { useRecoilState } from 'recoil';
import Song from './../Song/index';
function Songs() {
    const [playlist]= useRecoilState(playlistState);
    console.log(playlist)

    return (
        <div className="px-8 flex flex-col space-y-1 pb-28 text-white ">
            {playlist?.tracks.items.map((track,index) => (
                <Song key={track.track.id} track={track} order={index} />
            ))}
        </div>
    )
}

export default Songs
