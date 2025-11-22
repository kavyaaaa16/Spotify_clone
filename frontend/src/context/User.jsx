//UserContext as a global storage for the user.
//Currently empty, to be filled later with user data and methods to update it.
//Any component inside the UserProvider can grab the user directly from context without the need to pass props down manually at every level.
import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const[isAuth, setIsAuth] = useState(false);
    const[btnLoading, setBtnLoading] = useState(false);
    const[loading, setLoading] = useState(true);

    async function registerUser(name, email, password, navigate, fetchSongs, fetchAlbums){
        setBtnLoading(true);
        try{
            const {data} = await axios.post('/api/users/register', {name, email, password});

            toast.success(data.message);
            setUser(data.user);
            setIsAuth(true);
            setBtnLoading(false);
            navigate('/');         //redirect to home page after successful registration
            fetchSongs()
            fetchAlbums()
        } catch(error){
            toast.error(error.response.data.message);
        } finally {
            setBtnLoading(false);
        }
    }

    async function loginUser(email, password, navigate,fetchSongs,fetchAlbums){
        setBtnLoading(true);
        try{
            const {data} = await axios.post('/api/users/login', { email, password});

            toast.success(data.message);
            setUser(data.user);
            setIsAuth(true);
            navigate('/');         //redirect to home page after successful login
            fetchSongs()
            fetchAlbums()

        } catch(error){
            toast.error(error.response.data.message);
        } finally {
            setBtnLoading(false);
        }
    }

    async function fetchUserData(){ 
        try{
            const {data} = await axios.get('/api/users/me');
            setUser(data.user);
            setIsAuth(true);
            setLoading(false);
        }
        catch(error){
            console.log(error);
            setIsAuth(false);
            setLoading(false);
        }
    }

    async function logoutUser(navigate) {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out");
    } catch (error) {
      console.error("logout error:", error);
      toast.error(error?.response?.data?.message || "Logout failed");
    } finally {
      // 👇 make sure UI updates no matter what
      setUser([]);
      setIsAuth(false);
      navigate("/login"); // or "/" if you prefer
    }
  }

  
    async function addToPlaylist(id) {
        try{
            const {data} = await axios.post("/api/users/songs/"+id)

            toast.success(data.message);
            fetchUser();
        } catch (error){
            toast.error(error.response.data.message);
        }
        
    }
  
    useEffect(()=>{
        fetchUserData()
    }, []);

    return <UserContext.Provider value={{registerUser,user, isAuth, btnLoading, loading, loginUser, logoutUser,addToPlaylist}}> {children}</UserContext.Provider>;
};

export const UserData = () => useContext(UserContext);