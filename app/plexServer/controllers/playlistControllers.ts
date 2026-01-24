import { Request, Response } from "express"
import plexAPI from "../../config/plex.js"

class PlaylistControllers {
  private plexAPI = plexAPI

  async getPlaylists(req: Request, res: Response): Promise<void> {
    const response = await this.plexAPI.playlist.listPlaylists
    res.status(200).json(response)
  }

  async getPlaylist(req: Request, res: Response): Promise<void> {
    const { playlistID } = req.params
    const { type, offset = "0", limit = "10" } = req.query
    const playlist = await this.plexAPI.playlist.getPlaylist({
      playlistId: Number(playlistID),
    })
    const playlistItems = await this.plexAPI.playlist.getPlaylistItems({
      playlistId: Number(playlistID),
      type: [Number(type)],
    })

    const offsetNum = Number(offset)
    const limitNum = Number(limit)

    const paginatedItems =
      playlistItems &&
      playlistItems?.mediaContainerWithMetadata?.mediaContainer?.metadata?.slice(
        offsetNum,
        offsetNum + limitNum,
      )

    res.status(200).json({
      playlist,
      items: paginatedItems,
      offset: offsetNum,
      limit: limitNum,
    })
  }
}

export const playlistControllers = new PlaylistControllers()
