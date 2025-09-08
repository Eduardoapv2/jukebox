import db from "#db/client";

export async function createPlaylist({name, description}) {
  const sql = `
  INSERT INTO playlists
    (name, description)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [name, description]);
  return playlist;
}
export async function getPlaylists() {
  const sql = `
  SELECT *
  FROM playlists
  `;
  const { rows: playlists } = await db.query(sql);
  return playlists;
}

export async function getPlaylistById(id) {
  const sql = `
  SELECT *
  FROM playlists
  WHERE id = $1
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [id]);
  return playlist;
}

export async function getPlaylistIncludingPerson(id) {
  const sql = `
  SELECT playlists.*,
  ( SELECT to_json(tracks) FROM tracks WHERE tracks.id = playlists.track_id )
  AS track FROM playlists
  `;
  const { rows: playlists } = await db.query(sql);
  return playlists;
}

