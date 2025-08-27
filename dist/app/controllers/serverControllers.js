import plexAPI from "../config/plex.js";
class ServerControllers {
    constructor() {
        this.plexAPI = plexAPI;
    }
    async getMyPlexAccount(req, res) {
        const response = await this.plexAPI.server.getMyPlexAccount();
        res.status(200).json(response);
    }
}
export const serverControllers = new ServerControllers();
