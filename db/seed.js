import db from "#db/client";
import { faker, tr } from "@faker-js/faker"
import { createPlaylist } from "./queries/playlists.js";
import { createTrack } from "./queries/tracks.js";
import { createPlaylistTrack } from "./queries/playlists_tracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const usedPairs = new Set();
  // TODO
  for (let i = 1; i <= 10; i++) {
    const playlist = {
      name:faker.book.title(),
      description:faker.lorem.paragraphs({ min: 1, max: 2 })
    } 
    await createPlaylist(playlist);
}
 for (let i = 1; i <= 20; i++) {
   const track = {
    name:faker.music.songName(),
    duration_ms:faker.number.int({ min: 2, max: 7})
  } 
  await createTrack(track);
  }
  // for (let i = 1; i <= 30; i++) {
  //   const playlistId = 1 + Math.floor(Math.random() * 10);
  //   const trackId = 1 + Math.floor(Math.random() * 20);
  //   await createPlaylistTrack(playlistId, trackId);
  // }
  let count = 0;
  while (count < 30) {
    const playlistId = 1 + Math.floor(Math.random() * 10);
    const trackId = 1 + Math.floor(Math.random() * 20);
    const pair = `${playlistId}-${trackId}`;

    if (!usedPairs.has(pair)) {
      usedPairs.add(pair);
      await createPlaylistTrack(playlistId, trackId);
      count++;
    }
  }
  }
