import { UserData } from '../context/User';
import { Navigate, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { SongData } from '../context/Song';
import { MdDelete } from "react-icons/md";
import { set } from 'mongoose';

const Admin = () => {
  const { user } = UserData();     //to get user data and loading state
  const {albums, songs, addAlbum, loading, addSong, addThumbnail,deleteSong} = SongData();
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile]= useState(null)
  const [singer, setSinger]= useState("")
  const [album, setAlbum]=useState("")


  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const addAlbumHandler = e=>{
    e.preventDefault()

    const formData = new FormData()

    formData.append("title",title)
    formData.append("description", description)
    formData.append("file",file)

    addAlbum(formData, setTitle, setDescription,setFile)
  }

  const addSongHandler = e=>{
    e.preventDefault()

    const formData = new FormData()

    formData.append("title",title);
    formData.append("description", description);
    formData.append("singer", singer);
    formData.append("album", album); 
    formData.append("file",file);

    addSong(formData, setTitle, setDescription,setFile, setSinger, setAlbum);
  }

  const addThumbnailHandler=(id) => {
    const formData = new FormData();
    formData.append("file", file);

    addThumbnail(id,formData, setFile);

  }

  const deleteHandler=(id)=>{
    if(confirm("Are you sure?")){
      deleteSong(id);
    }
  }

  if (loading) {
    return <div className="text-white">Loading...</div>;     // Show loading state while fetching user data
  }

  if (!user || user.role !== "admin") {             // Check if user is not logged in or not an admin
    return <Navigate to="/" replace />;             // Redirect to home page if not authorized
  }
  
  return (
    <div className="min-h-screen bg-[#212121] text-white p-8">
      <Link to="/" className='bg-green-500 text-white font-bold py-2 px-4 rounded-full'>Go to Home Page</Link>
      <h2 className='text-2xl font-bold mb-6 mt-6'> Add Album </h2>

      <form onSubmit={addAlbumHandler} className='bg-[#181818] p-6 rounded-lg shadow-lg'>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Title</label>
          <input type='text' placeholder='Title' className='auth-input' 
          value={title} onChange={e=>setTitle(e.target.value)} 
          required/>
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Description</label>
          <input type='text' placeholder='Description' className='auth-input' 
          value={description} onChange={e=>setDescription(e.target.value)} 
          required/>
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Thumbnail</label>
          <input 
            type='file' 
            className="w-full text-white border border-gray-700 rounded-md p-2 bg-[#181818] file:bg-green-500 file:text-black file:font-semibold file:px-3 file:py-1 file:rounded-md"
            accept="image/*"
            onChange={fileChangeHandler}
          required/>
        </div>

        <button disabled={loading} className='auth-btn' style={{width: "90px" }}>{loading? "Please wait":"Add"}</button>

      </form>


      <h2 className='text-2xl font-bold mb-6 mt-6'> Add Songs </h2>   
      <form onSubmit={addSongHandler} className='bg-[#181818] p-6 rounded-lg shadow-lg'>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Title</label>
          <input type='text' placeholder='Title' className='auth-input' 
          value={title} onChange={e=>setTitle(e.target.value)} 
          required/>
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Description</label>
          <input type='text' placeholder='Description' className='auth-input' 
          value={description} onChange={e=>setDescription(e.target.value)} 
          required/>
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Singer</label>
          <input type='text' placeholder='Singer' className='auth-input' 
          value={singer} onChange={e=>setSinger(e.target.value)} 
          required/>
        </div>

        <select className='auth-input' value={album} onChange={e =>setAlbum(e.target.value)}>
          <option value="">Choose Album</option>
          {albums && albums.map((e,i)=> (
            <option value = {e._id} key = {i}>
              {e.title}
            </option>
          ))}
        </select>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Audio</label>
          <input
            type='file'
            accept='audio/*'
            onChange={fileChangeHandler}
            className="w-full text-white border border-gray-700 rounded-md p-2 bg-[#181818]
                      file:bg-green-500 file:text-black file:font-semibold 
                      file:px-3 file:py-1 file:rounded-md"
            required/>
        </div>


        <button disabled={loading} className='auth-btn' style={{width: "90px" }}>{loading? "Please wait":"Add"}</button>

      </form>

      <div className='mt-8'>
        <h3 className='text-xl font-semibold mb-4'>Added Songs</h3>
        <div className='flex justify-center md:justify-start gap-2 items-center flex-wrap'>
            {songs && songs.map((e,i)=>(
              <div key={i} className='bg-[#181818] p-4 rounded-lg shadow-md'>
                {e.thumbnail ? (<img src={e.thumbnail.url} alt ="" className='mr-1 w-52 h-52'/>) : (
                  <div className='flex flex-col justify-center items-center gap-2'>
                    <input
                      type="file"
                      accept="image/*" onChange={fileChangeHandler}
                      className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-black
                        hover:file:bg-green-400 bg-[#181818] border border-gray-700 rounded-md p-2"/>
                    <button onClick={() => addThumbnailHandler(e._id)} className='bg-green-500 text-white px-2 py-1 rounded'>Add Thumbnail</button>
                  </div>
                )}

              <h4 className='text-lg font-bold'>{e.title}</h4>
              <h4 className='text-sm text-gray-500'>{e.singer}</h4>
              <h4 className='text-sm text-gray-500'>{e.description}</h4>

              <button onClick={()=> deleteHandler(e._id)} className='px-3 py-1 bg-red-500 text-white rounded'><MdDelete /></button>


              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
