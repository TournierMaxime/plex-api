import plexAPI from "../../config/plex.js";
class ServerControllers {
    constructor() {
        this.plexAPI = plexAPI;
    }
    async getMyPlexAccount(req, res) {
        const response = await this.plexAPI.server.getMyPlexAccount();
        res.status(200).json(response);
    }
    async getDevices(req, res) {
        const response = await this.plexAPI.server.getDevices();
        res.status(200).json(response);
    }
    async getServerCapabilities(req, res) {
        const response = await this.plexAPI.server.getServerCapabilities();
        res.status(200).json(response);
    }
    async getServerPreferences(req, res) {
        const response = await this.plexAPI.server.getServerPreferences();
        res.status(200).json(response);
    }
}
export const serverControllers = new ServerControllers();
