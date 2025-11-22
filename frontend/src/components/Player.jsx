import React from 'react'
import { SongData } from '../context/Song'
import { useEffect,useRef } from 'react';
import {GrChapterNext, GrChapterPrevious} from 'react-icons/gr';
import { FaPlay, FaPause } from "react-icons/fa";
import { useState } from 'react';


const Player = () => {
    const {song, fetchSingleSong, selectedSong, isPlaying, setIsPlaying, nextMusic, prevMusic} = SongData();
    console.log(song);

    useEffect(() => {
  if (!selectedSong) return;  
  fetchSingleSong();
}, [selectedSong]);
    const audioRef = useRef(null)

    const handlePlayPause=()=>{
        if(isPlaying){
            audioRef.current.pause()
        }else{
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying);
    };

    const [progress, setProgress] =useState(0);
    const [duration,setDuration] = useState(0);
    
    useEffect(()=> {
        const audio = audioRef.current
        if(!audio) return;

        const handleLoadedMetaData = ()=> {
            setDuration(audio.duration)
        }

        const handleTimeUpdate=()=>{
            setProgress(audio.currentTime);
        };

        audio.addEventListener("loadmetadata", handleLoadedMetaData)
        audio.addEventListener("timeupdate", handleTimeUpdate);
        
        const interval = setInterval(() => {
        if (audio.duration && audio.duration !== duration) {
            setDuration(audio.duration);
            }
        }, 500);

        return ()=>{
            audio.removeEventListener("loadedmetadata",handleLoadedMetaData);
            audio.removeEventListener("timeupdate", handleTimeUpdate)
        };
    }, [song]);

    const handleProgressChange = (e)=>{
        const audio = audioRef.current;
        if (!audio) return;

        const newTime = Number(e.target.value);
        audio.currentTime = newTime;
        setProgress(newTime);
    }

    const [volume, setVolume] =useState(1)

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        audioRef.current.volume=newVolume;
    }

  return( 
    <div>
    {
        song && (<div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
            <div className='lg:flex items-center gap-4'>
                <img src= {song.thumbnail ? song.thumbnail.url: "https//via.placeholder.com/50"}
                className='w-12'
                alt=""/>
            <div className='hidden md:block'>
                <p>{song.title}</p>
                <p>{song.description && song.description.slice(0,30)}...</p>
            </div>
            </div>
            <div className='flex flex-col items-center gap-1 m-auto'>
                {song && song.audio && (
                    <>
                    {isPlaying ? (
                    <audio ref={audioRef} src={song.audio.url} autoPlay/>
                    ) : (
                        <audio ref ={audioRef} src={song.audio.url}/>

                    )}

                    </>
                )}

            <div className='w-full flex items-center font-thin text-green-400'>
        <input type ="range" min={"0"} max={duration||0} className='progress-bar w-[250px] md:w=[300px]' value={progress} onChange={handleProgressChange}/>
    </div>

    <div className='flex justify-center items-center gap-4'>
        <span className='cursor-pointer' onClick={prevMusic}>
            <GrChapterPrevious/>
        </span>
        <button className='bg-white text-black rounded-full p-2' onClick={handlePlayPause}>{isPlaying? <FaPause/> : <FaPlay/>}</button>
        <span className='cursor-pointer' onClick={nextMusic}>
            <GrChapterNext/>
        </span>
        
    </div>
    </div>
    <div className='flex items-center'>
        <input type='range' className='w-16 md:w-32' min={'0'} max={'1'} step={'0.01'} value={volume} onChange={handleVolumeChange}/>
    </div>
    </div>
    )}
    
  </div>
  );
};

export default Player
