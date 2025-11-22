import AlbumItem from '../components/AlbumItem';
import SongItem from '../components/SongItem';
import Layout from '../components/Layout';
import {SongData} from '../context/Song';
import React from 'react'

const Home = () => {
  const {songs, albums}= SongData()
  
  return <Layout>
    <div className='mb-4'>
      <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
      <div className='flex overflow-auto'>
        {
          albums.map((e,i)=>(
            <AlbumItem key={i} image={e.thumbnail.url} name={e.title} desc={e.description} id={e._id}/>
          ))
        }
      </div>
    </div>
    
    <div className='mb-4'>
      <h1 className='my-5 font-bold text-2xl'>Latest Hits</h1>
      <div className='flex overflow-auto'>
        {
          songs.map((e,i)=>(
            <SongItem key={i} image={e.thumbnail.url} name={e.title} desc={e.description} id={e._id}/>
          ))
        }
      </div>
    </div>

    
  </Layout>;
}

export default Home;
