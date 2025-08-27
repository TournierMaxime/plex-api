import plexAPI from "../../config/plex.js";
class LibraryControllers {
    constructor() {
        this.plexAPI = plexAPI;
    }
    /*   async getAllLibraries(req: Request, res: Response): Promise<void> {
      const response = await this.plexAPI.library.getAllLibraries()
      res.status(200).json(response)
    } */
    async fetchPlexRaw(path) {
        const base = `${process.env.PLEX_SERVER_PROTOCOL}://${process.env.PLEX_SERVER_IP}:${process.env.PLEX_SERVER_PORT}`;
        const url = `${base}${path}${path.includes("?") ? "&" : "?"}X-Plex-Token=${process.env.PLEX_SERVER_TOKEN}`;
        const r = await fetch(url, { headers: { Accept: "application/json" } });
        const text = await r.text();
        const ct = r.headers.get("content-type") ?? "";
        return { status: r.status, ct, text };
    }
    // controllers/libraryControllers.ts
    async getAllLibraries(req, res) {
        const { status, ct, text } = await this.fetchPlexRaw("/library/sections");
        res.status(status).type("application/json").send(text);
    }
}
export const libraryControllers = new LibraryControllers();
