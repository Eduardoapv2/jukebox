import db from "#db/client";

export async function createPlaylistTrack(playlistId, trackId) {
  const sql = `
  INSERT INTO playlists_tracks
    (playlist_id, track_id)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [playlistTrack],
  } = await db.query(sql, [playlistId, trackId]);
  return playlistTrack;
}
export async function getPlaylistTrack() {
  // TODO
   const sql = `
  SELECT playlists_tracks.*,
  tracks.name AS track_name,
  playlists.name AS playlist_name
  FROM playlists_tracks 
  JOIN tracks ON playlists_tracks.track_id = tracks.id
  JOIN playlists ON playlists_tracks.playlist_id = playlists.id
  `;
  const { rows: playlistTrack } = await db.query(sql);
  return playlistTrack;
}

export async function getPlaylistTrackByTrackId(id) {
  const sql = `
  SELECT *
  FROM playlists_tracks
  WHERE track_id = $1
  `;
  const { rows: playlistTrack } = await db.query(sql, [id]);
  return playlistTrack;
}

export async function getPlaylistTrackByPlaylistId(id) {
  // TODO
  const sql = `
  SELECT *
  FROM playlists_tracks
  WHERE playlist_id = $1
  `;
  const { rows: playlistTrack } = await db.query(sql, [id]);
  return playlistTrack;
}