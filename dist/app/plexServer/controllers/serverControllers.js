import plexAPI from "../../config/plex.js";
import { plexToken, plexClient } from "../../config/plex.js";
import fetch from "node-fetch";
export class ServerControllers {
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
    async getServerResources(req, res) {
        const response = await fetch("https://plex.tv/api/v2/resources", {
            method: "get",
            headers: {
                Accept: "application/json",
                "X-Plex-Token": plexToken,
                "X-Plex-Client-Identifier": plexClient,
            },
        });
        const data = await response.json();
        res.status(200).json({ resources: data });
    }
}
export const serverControllers = new ServerControllers();
