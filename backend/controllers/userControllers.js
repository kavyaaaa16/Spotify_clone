//to register
import { User } from "../models/User.js";
import TryCatch from "../utils/TryCatch.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateTokens.js";
import { Maximize } from "lucide-react";

//when we register user, we create user in db and generate token and send it as cookie
export const registerUser = TryCatch(async(req,res)=> {
    const {name, email, password} = req.body;    //check if user exists

    let user= await User.findOne({email})

    if(user) return res.status(400).json({
        message: "User already exists",
    });

    const hashPassword= await bcrypt.hash(password, 10);
    user=await User.create({
        name, email, password: hashPassword,
    });

    generateToken(user._id,res)

    res.status(201).json({       //201 is for "created"
        user,
        message: "User Registered",
    });


});

//when the user logs in, we check if user exists, compare password, generate token and send it as cookie
export const loginUser = TryCatch(async(req,res)=> {
    const {email, password} = req.body;    //check if user exists

    const user= await User.findOne({email})

    if(!user) return res.status(400).json({
        message: "No user found",
    });

    //if user exists, compare password

    const comparePassword= await bcrypt.compare(password, user.password);

    if(!comparePassword) 
        return res.status(400).json({
        message: "Wrong Password",
    });

    generateToken(user._id,res)

    res.status(200).json({       //201 is for "created"
        user,
        message: "User Logged In",
    });


});

//to get the profile of logged in user
export const myProfile = TryCatch(async (req, res) => {
  // req.user already set by isAuth
  const user = await User.findById(req.user._id).select("-password");
  return res.status(200).json({ user });
});


//to logout user, we just clear the cookie
export const logoutUser = TryCatch(async (req, res) => {
  res.cookie("token", "", {
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",      
  });

  res.json({
    message: "User Logged Out",
  });
});

//to save the song to playlist
export const savetoPlaylist = TryCatch(async (req, res) => {
    const songId = req.params.id;
    const user = await User.findById(req.user._id);

    // Convert all IDs to strings for comparison
    const exists = user.playlist.some(
        (id) => id.toString() === songId.toString()
    );

    if (exists) {
        user.playlist = user.playlist.filter(
            (id) => id.toString() !== songId.toString()
        );

        await user.save();
        return res.json({ message: "Removed from Playlist" });
    }

    // Add song
    user.playlist.push(songId);

    await user.save();
    return res.json({ message: "Added to Playlist" });
});
