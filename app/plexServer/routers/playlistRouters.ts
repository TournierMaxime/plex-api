import expressAsyncHandler from "express-async-handler"
import { Application } from "express"
import { playlistControllers } from "../controllers/playlistControllers.js"

const configurePlaylistRoutes = (app: Application) => {
  app.get(
    "/api/v1/plex/playlists",
    expressAsyncHandler((req, res) =>
      playlistControllers.getPlaylists(req, res)
    )
  )
  app.get(
    "/api/v1/plex/playlists/:playlistID",
    expressAsyncHandler((req, res) => playlistControllers.getPlaylist(req, res))
  )
}

export { configurePlaylistRoutes }
