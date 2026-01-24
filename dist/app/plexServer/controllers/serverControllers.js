import plexAPI from "../../config/plex.js";
import { plexToken, plexClient } from "../../config/plex.js";
import fetch from "node-fetch";
export class ServerControllers {
    constructor() {
        this.plexAPI = plexAPI;
    }
    async getDevices(req, res) {
        const response = await this.plexAPI.devices.listDevices();
        res.status(200).json(response);
    }
    async getServerCapabilities(req, res) {
        const identity = await this.plexAPI.general.getIdentity();
        res.status(200).json({ identity });
    }
    async getServerPreferences(req, res) {
        const response = await this.plexAPI.preferences.getAllPreferences();
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
