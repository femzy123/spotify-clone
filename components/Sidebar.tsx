import React, {useState, useEffect} from "react";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon
} from "@heroicons/react/outline";
import {signOut, useSession} from "next-auth/react"
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";

interface Props {}

const menus = [
  {
    name: "Home",
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    name: "Search",
    icon: <SearchIcon className="h-5 w-5" />,
  },
  {
    name: "Library",
    icon: <LibraryIcon className="h-5 w-5" />,
  },
];

const Sidebar = (props: Props) => {
  const spotifyApi = useSpotify();
  const {data: session, status} = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  console.log("You picked playlist: ", playlistId);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then(data => {
        setPlaylists(data.body.items);
        console.log(data);
      });
    }
  }, [session, spotifyApi])

  // console.log(playlists);

  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white" onClick={() => signOut()}>
          <PlusCircleIcon className="h-5 w-5" />
          <p>Logout</p>
        </button>
        {menus.map((menu, i) => (
          <button
            key={i}
            className="flex items-center space-x-2 hover:text-white"
          >
            {menu.icon}
            <p>{menu.name}</p>
          </button>
        ))}
        <hr className="border-t-[0.10px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.10px] border-gray-900" />
        {/* Playlist */}
        {playlists.map((playlist) => (
          <p key={playlist.id} onClick={() => setPlaylistId(playlist.id)} className="cursor-pointer hover:text-white">{playlist.name}</p>
        ))}
        
        
      </div>
    </div>
  );
};

export default Sidebar;
