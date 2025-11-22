import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import uploadFile from '../middlewares/multer.js';
import { addSong, addThumbnail, createAlbum, deleteSong, getAllAlbums, getAllSongs, getAllSongsByAlbum, getSingleSong } from '../controllers/songControllers.js';

const router= express.Router();

router.post("/album/new", isAuth, uploadFile, createAlbum);  //create new album
router.get("/album/all", isAuth, getAllAlbums);             //get all albums
router.post("/new", isAuth, uploadFile, addSong);          //add new song
router.post("/:id", isAuth, uploadFile, addThumbnail);     //add thumbnail to song
router.get("/all", isAuth, getAllSongs);                   //fetch all songs
router.get("/album/:id", isAuth, getAllSongsByAlbum);     //fetch acc to album
router.delete("/:id", isAuth, deleteSong);
router.get("/single/:id", isAuth, getSingleSong);



export default router;