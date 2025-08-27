import plexAPI from "../../config/plex.js";
class ActivityControllers {
    constructor() {
        this.plexAPI = plexAPI;
    }
    async getServerActivities(req, res) {
        const response = await this.plexAPI.activities.getServerActivities();
        res.status(200).json(response);
    }
}
export const activityControllers = new ActivityControllers();
