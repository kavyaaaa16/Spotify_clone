import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/User.jsx'
import { SongProvider } from './context/Song.jsx'
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <SongProvider>
      <App />
      <Toaster position="top-center" /> 
      </SongProvider>
    </UserProvider>
  </StrictMode>,
)
