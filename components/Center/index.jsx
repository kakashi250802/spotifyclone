import { useSession,signOut } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "./../../atoms/PlaylistAtom";
import useSpotify from "./../../hook/useSpotify/index";
import Songs from './../Songs/index';

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];
function Center() {
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const defaultPlaylistImage= "https://upload.wikimedia.org/wikipedia/commons/3/3c/No-album-art.png"
  const spotifyApi = useSpotify();
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);
  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then(
         function (data){
        setPlaylist(data.body);
      },
      function (err) {
          console.log("wrong", err)
        } 
          
      );
  }, [spotifyApi, playlistId]);
  console.log(playlist)
  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className=" absolute top-5 right-8">
        <div className="flex items-center
         bg-black space-x-3 opacity-90 hover:opacity-80 rounded-full cursor-pointer p-1 
         pr-2 text-white"
         onClick={signOut}
         >
          <img
            src={session?.user.image }
            className="rounded-full w-10 h-10"
            alt=""
          />
          <h2 className="font-semibold">{session?.user.name}</h2>
          <ChevronDownIcon className=" h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex w-full items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img
          className="h-60 w-60 shadow-2xl "
          src={playlist?.images?.[0]?.url || defaultPlaylistImage }
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="font-bold text-2xl md:text-3xl xl:text-5xl">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div>
          <Songs />
      </div>
    </div>
  );
}

export default Center;
