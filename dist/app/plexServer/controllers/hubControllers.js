import plexAPI from "../../config/plex.js";
class HubControllers {
    constructor() {
        this.plexAPI = plexAPI;
    }
    async getGlobalHubs(req, res) {
        const response = await this.plexAPI.hubs.getAllHubs({});
        res.status(200).json(response);
    }
    async getLibraryHubs(req, res) {
        const { sectionId } = req.params;
        const response = await this.plexAPI.hubs.getHubItems({
            identifier: [sectionId],
        });
        res.status(200).json(response);
    }
}
export const hubControllers = new HubControllers();
