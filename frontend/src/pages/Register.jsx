import React from 'react'
import { Link } from 'react-router-dom'
import { UserData } from '../context/User';
import { useNavigate } from 'react-router-dom';
import { SongData } from '../context/Song';

const Register = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");

    const  {registerUser, btnLoading} = UserData();   //value that we take from User.jsx context

    const navigate = useNavigate();

    const {fetchSongs, fetchAlbums} = SongData();

  const submitHandler = (e) => {
    e.preventDefault();

    registerUser(name, email, password, navigate,fetchSongs,fetchAlbums);   //call registerUser function from context with these parameters
  }
  return <div className="flex items-center justify-center h-screen max-h-screen">
    <div className='bg-black text-white p-8 rounded-lg shadow-lg max-w-md w-full'>
      <h2 className='text-3xl font-semibold text-center mb-8'>Register to Spotify</h2>
    
      <form className='mt-8' onSubmit={submitHandler}>

        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Name</label>
          <input type='text' placeholder='Name' className='auth-input' value={name} onChange={e=>setName(e.target.value)} required/>
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Email or Username</label>
          <input type='email' placeholder='Email or Username' className='auth-input' value={email} onChange={e=>setEmail(e.target.value)}required/>
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Password</label>
          <input type='password' placeholder='Password' className='auth-input' value={password} onChange={e=>setPassword(e.target.value)} required/>
        </div>

          <button disabled={btnLoading} className='auth-btn'>{btnLoading? "Please Wait..": "Register"}</button>   
          {/*button text changes based on btnLoading state*/}

          <div className='mt-6 text-center'>
            <Link to="/login" className='text-sm text-gray-400 hover:text-gray-300'>Have an account?</Link>
          </div>
          
          </form>
    </div>
    </div>
}

export default Register
