import plexAPI from "../../config/plex.js";
class LibraryControllers {
    constructor() {
        this.plexAPI = plexAPI;
    }
    async getAllLibraries(req, res) {
        const response = await this.plexAPI.library.getAllLibraries();
        res.status(200).json(response);
    }
}
export const libraryControllers = new LibraryControllers();
