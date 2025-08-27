import plexAPI from "../../config/plex.js";
class HubControllers {
    constructor() {
        this.plexAPI = plexAPI;
    }
    async getGlobalHubs(req, res) {
        const response = await this.plexAPI.hubs.getGlobalHubs();
        res.status(200).json(response);
    }
    async getLibraryHubs(req, res) {
        const { sectionId } = req.params;
        const response = await this.plexAPI.hubs.getLibraryHubs(Number(sectionId));
        res.status(200).json(response);
    }
}
export const hubControllers = new HubControllers();
