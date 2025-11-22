import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../context/User';
import { SongData } from '../context/Song';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState("");

  const  {loginUser, btnLoading} = UserData();   //value that we take from User.jsx context
  const {fetchSongs, fetchAlbums} = SongData();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    loginUser(email, password, navigate, fetchSongs,fetchAlbums);
  };

  return <div className="flex items-center justify-center h-screen max-h-screen">
    <div className='bg-black text-white p-8 rounded-lg shadow-lg max-w-md w-full'>
      <h2 className='text-3xl font-semibold text-center mb-8'>Login to Spotify</h2>

      <form className='mt-8' onSubmit={submitHandler}>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Email or Username</label>
          <input type='email' placeholder='Email or Username' className='auth-input' value={email} onChange={e=>setEmail(e.target.value)}required/>
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Password</label>
          <input type='password' placeholder='Password' className='auth-input' value={password} onChange={e=>setPassword(e.target.value)} required/>
          </div>

          <button disabled={btnLoading} className='auth-btn'>{btnLoading? "Please Wait..": "Login"}</button>   

          <div className='mt-6 text-center'>
            <Link to="/register" className='text-sm text-gray-400 hover:text-gray-300'>Don't have an account? Register</Link>
          </div>
          
          </form>
    </div>
    </div>
}

export default Login
