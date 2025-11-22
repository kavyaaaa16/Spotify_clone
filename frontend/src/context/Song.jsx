import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const SongContext = createContext()

export const SongProvider = ({children}) => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [songLoading, setSongLoading] = useState(true);
    const [selectedSong, setSelectedSong]= useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    
    async function fetchSongs() {
        try{
            const {data} = await axios.get('/api/songs/all');

            setSongs(data);
            if (data.length > 0) {
                setSelectedSong(data[0]._id);
            }

            setIsPlaying(false);

        }catch(error){
            console.log(error);
        }
    }

    const [song,setSong]= useState([])

    async function fetchSingleSong() {
        try{
            const {data} = await axios.get("/api/songs/single/"+selectedSong);

            setSong(data);
        } catch(error){
            console.log(error)
        }
        
    }

    async function addAlbum(formData,setTitle, setDescription,setFile) {
        setLoading(true);
        try{
            const {data} = await axios.post('/api/songs/album/new', formData);
            toast.success(data.message);
            setLoading(false);
            fetchAlbums();
            setTitle("");
            setDescription("");
            setFile(null);
            
        } catch(error){
            toast.error(error.response.data.message);
            setLoading(false);
        }
    }

    async function addSong(formData,setTitle, setDescription,setFile, setSinger, setAlbum) {
        setLoading(true);
        try{
            const {data} = await axios.post('/api/songs/new', formData);
            toast.success(data.message);
            setLoading(false);
            fetchSongs();
            setTitle("");
            setDescription("");
            setFile(null);
            setSinger("");
            setAlbum("");
            
        } catch(error){
            toast.error(error.response.data.message);
            setLoading(false);
        }
    }

    async function addThumbnail(id, formData,setFile) {
        setLoading(true);
        try{
            const {data} = await axios.post('/api/songs/'+id, formData);
            toast.success(data.message);
            setLoading(false);
            fetchSongs();
            setFile(null);
            
        } catch(error){
            toast.error(error.response.data.message);
            setLoading(false);
        }
    }

    const [albums, setAlbums] = useState([]);

    async function fetchAlbums() {
        try{
                const {data} = await axios.get('/api/songs/album/all');

                setAlbums(data);
            }catch(error){
                console.log(error);
            }
        }

    async function deleteSong(id){
        try {
            const {data} = await axios.delete("/api/songs/"+id);

            toast.success(data.message);
            fetchSongs();
        } catch (error){
            toast.error(error.response.data.message);
        }
    }
    useEffect(()=>{
        fetchSongs();
        fetchAlbums();
    },[]);

    const [index, setIndex] = useState(0)

    function nextMusic(){
        if(index===songs.length-1){
            setIndex(0)
            setSelectedSong(songs[0]._id)
        } else{
            setIndex(index+1)
            setSelectedSong(songs[index+1]._id)
        }
    }

    function prevMusic(){
        if(index===0){
            return null;
        } else{
            setIndex(index-1)
            setSelectedSong(songs[index-1]._id)
        }
        
    }

    const [albumSong, setAlbumSong] = useState([]);
    const [albumData, setAlbumData] = useState([]);

    async function fetchAlbumSong(id){
        try {
            const {data} = await axios.get("/api/songs/album/"+id);
            setAlbumSong(data.songs);
            setAlbumData(data.album)
    } catch(error){
        console.log(error);
    }
}
    return <SongContext.Provider value={{songs, addAlbum, loading, songLoading,albums, addSong, addThumbnail, deleteSong, fetchSingleSong,song,setSelectedSong,isPlaying,setIsPlaying, selectedSong,nextMusic,prevMusic, fetchAlbumSong, albumData, albumSong, fetchSongs, fetchAlbums}}>{children}</SongContext.Provider>;
    };

export const SongData = () => useContext(SongContext)