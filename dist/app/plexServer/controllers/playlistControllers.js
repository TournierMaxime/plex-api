import plexAPI from "../../config/plex.js";
class PlaylistControllers {
    constructor() {
        this.plexAPI = plexAPI;
    }
    async getPlaylists(req, res) {
        const response = await this.plexAPI.playlists.getPlaylists();
        res.status(200).json(response);
    }
    async getPlaylist(req, res) {
        const { playlistID } = req.params;
        const { type } = req.query;
        const playlist = await this.plexAPI.playlists.getPlaylist(Number(playlistID));
        const playlistItems = await this.plexAPI.playlists.getPlaylistContents(Number(playlistID), Number(type));
        res.status(200).json({ playlist, items: playlistItems });
    }
}
export const playlistControllers = new PlaylistControllers();
