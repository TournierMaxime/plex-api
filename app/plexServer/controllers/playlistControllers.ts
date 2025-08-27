import { Request, Response } from "express"
import plexAPI from "../../config/plex.js"

class PlaylistControllers {
  private plexAPI = plexAPI

  async getPlaylists(req: Request, res: Response): Promise<void> {
    const response = await this.plexAPI.playlists.getPlaylists()
    res.status(200).json(response)
  }

  async getPlaylist(req: Request, res: Response): Promise<void> {
    const { playlistID } = req.params
    const { type } = req.query
    const playlist = await this.plexAPI.playlists.getPlaylist(
      Number(playlistID)
    )
    const playlistItems = await this.plexAPI.playlists.getPlaylistContents(
      Number(playlistID),
      Number(type)
    )
    res.status(200).json({ playlist, items: playlistItems })
  }
}

export const playlistControllers = new PlaylistControllers()
