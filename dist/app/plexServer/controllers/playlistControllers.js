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
        const { type, offset = "0", limit = "10" } = req.query;
        const playlist = await this.plexAPI.playlists.getPlaylist(Number(playlistID));
        const playlistItems = await this.plexAPI.playlists.getPlaylistContents(Number(playlistID), Number(type));
        const offsetNum = Number(offset);
        const limitNum = Number(limit);
        const paginatedItems = playlistItems &&
            playlistItems?.object?.mediaContainer?.metadata?.slice(offsetNum, offsetNum + limitNum);
        res.status(200).json({
            playlist,
            items: paginatedItems,
            offset: offsetNum,
            limit: limitNum,
        });
    }
}
export const playlistControllers = new PlaylistControllers();
