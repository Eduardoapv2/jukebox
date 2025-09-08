import express from "express";
const router = express.Router();
export default router;

import { 
createPlaylist,
getPlaylists,
getPlaylistById,
 } from "#db/queries/playlists";
 import { createPlaylistTrack } from "#db/queries/playlists_tracks";
 import { getTracksByPlaylistId } from "#db/queries/tracks";

 router
 .route("/")
 .get(async (req, res)=>{
    const playlist = await getPlaylists();
    res.send(playlist);
 })
 .post(async(req, res)=>{
    if (!req.body) return res.status(400).send("Request body is required.");
    const { name, description } = req.body;
    if(!name || !description) return res.status(400).send("Request body requires: name, description");

    const playlist = await createPlaylist({name, description});
    res.status(201).send(playlist);
 });

 router.param("id", async(req, res, next, id)=>{
    const numId = Number(id);
  if (isNaN(numId)) {
    return res.status(400).send("Playlist id must be a number.");
  }
    const playlist = await getPlaylistById(id);
    if (!playlist) return res.status(404).send("Playlist not found.");
    req.playlist = playlist;
    next();
 });

 router.route("/:id").get((req, res) => {
  res.send(req.playlist);
});

router
  .route("/:id/tracks")
  .get(async (req, res) => {
    const tracks = await getTracksByPlaylistId(req.playlist.id);
    res.status(200).send(tracks);
  })
  .post(async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0){
         return res.status(400).send("Request body is required.");
    }
    const { trackId } = req.body;
    if (!trackId) return res.status(400).send("Request body requires: trackId");

     const numTrackId = Number(trackId);
  if (isNaN(numTrackId)) {
    return res.status(400).send("trackId must be a number");
  }
    const playlistTrack = await createPlaylistTrack(req.playlist.id, trackId);
    res.status(201).send(playlistTrack);
  });