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
        const capabilities = await this.plexAPI.server.getServerCapabilities();
        const identity = await this.plexAPI.server.getServerIdentity();
        const clients = await this.plexAPI.server.getAvailableClients();
        const serverList = await this.plexAPI.server.getServerList();
        res.status(200).json({ capabilities, identity, clients, serverList });
    }
    async getServerPreferences(req, res) {
        const response = await this.plexAPI.server.getServerPreferences();
        res.status(200).json(response);
    }
}
export const serverControllers = new ServerControllers();
