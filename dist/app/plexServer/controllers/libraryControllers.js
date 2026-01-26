import plexAPI from "../../config/plex.js";
import { plexToken } from "../../config/plex.js";
class LibraryControllers {
    constructor() {
        this.plexAPI = plexAPI;
        this.plexEndoint = `${process.env.PLEX_SERVER_PROTOCOL}://${process.env.PLEX_SERVER_IP}:${process.env.PLEX_SERVER_PORT}`;
        /**
         * 1 = movie
         * 2 = show
         * 3 = season
         * 4 = episode
         *
         */
        /*   async getAllMediaLibrary(req: Request, res: Response): Promise<void> {
          const { sectionKey } = req.params
          const { type } = req.query
      
          const response = await this.plexAPI.library.getLibrarySectionsAll({
            sectionKey: Number(sectionKey),
            type: Number(type),
          })
          res.status(200).json(response)
        } */
    }
    async fetchPlexRaw(path) {
        const base = `${process.env.PLEX_SERVER_PROTOCOL}://${process.env.PLEX_SERVER_IP}:${process.env.PLEX_SERVER_PORT}`;
        const url = `${base}${path}${path.includes("?") ? "&" : "?"}X-Plex-Token=${plexToken}`;
        const r = await fetch(url, { headers: { Accept: "application/json" } });
        const text = await r.text();
        const ct = r.headers.get("content-type") ?? "";
        return { status: r.status, ct, text };
    }
    async getAllLibraries(req, res) {
        const { status, ct, text } = await this.fetchPlexRaw("/library/sections");
        res.status(status).type("application/json").send(text);
    }
    async getAllMediaLibrary(req, res) {
        const { sectionKey } = req.params;
        const { type, offset, limit } = req.query;
        const { status, ct, text } = await this.fetchPlexRaw(`/library/sections/${sectionKey}/all?type=${type}&X-Plex-Container-Start=${offset}&X-Plex-Container-Size=${limit}`);
        res.status(status).type("application/json").send(text);
    }
    async deleteMetadataItem(req, res) {
        const { ids } = req.params;
        const response = await this.plexAPI.library.deleteMetadataItem({ ids });
        res.status(200).json(response);
    }
    async getLibraryMetada(req, res) {
        const { ratingKey } = req.params;
        const plexLibraryMetadata = await fetch(`${this.plexEndoint}/library/metadata/${ratingKey}`, {
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "X-Plex-Token": plexToken,
            },
            method: "GET",
        });
        const data = await plexLibraryMetadata.json();
        const { MediaContainer } = data;
        res.status(200).json({
            librarySectionID: MediaContainer.librarySectionID,
            librarySectionTitle: MediaContainer.librarySectionTitle,
            librarySectionUUID: MediaContainer.librarySectionUUID,
            Metadata: {
                ratingKey: MediaContainer.Metadata[0].ratingKey,
                slug: MediaContainer.Metadata[0].slug,
                studio: MediaContainer.Metadata[0].studio,
                type: MediaContainer.Metadata[0].type,
                title: MediaContainer.Metadata[0].title,
                summary: MediaContainer.Metadata[0].summary,
                lastViewedAt: MediaContainer.Metadata[0].lastViewedAt,
                year: MediaContainer.Metadata[0].year,
                tagline: MediaContainer.Metadata[0].tagline,
                duration: MediaContainer.Metadata[0].duration,
                originallyAvailableAt: MediaContainer.Metadata[0].originallyAvailableAt,
                addedAt: MediaContainer.Metadata[0].addedAt,
            },
            Media: {
                id: MediaContainer.Metadata[0].Media[0].id,
                duration: MediaContainer.Metadata[0].Media[0].duration,
                bitrate: MediaContainer.Metadata[0].Media[0].bitrate,
                width: MediaContainer.Metadata[0].Media[0].width,
                height: MediaContainer.Metadata[0].Media[0].height,
                audioCodec: MediaContainer.Metadata[0].Media[0].audioCodec,
                videoCodec: MediaContainer.Metadata[0].Media[0].videoCodec,
                videoResolution: MediaContainer.Metadata[0].Media[0].videoResolution,
                container: MediaContainer.Metadata[0].Media[0].container,
                videoFrameRate: MediaContainer.Metadata[0].Media[0].videoFrameRate,
            },
            Part: {
                id: MediaContainer.Metadata[0].Media[0].Part[0].id,
                file: MediaContainer.Metadata[0].Media[0].Part[0].file,
                size: MediaContainer.Metadata[0].Media[0].Part[0].size,
            },
            Image: MediaContainer.Metadata[0].Image.map((m) => {
                return {
                    alt: m.alt,
                    type: m.type,
                    url: m.url,
                };
            }),
            Genre: MediaContainer.Metadata[0].Genre.map((m) => {
                return {
                    id: m.id,
                    filter: m.filter,
                    tag: m.tag,
                };
            }),
            Country: MediaContainer.Metadata[0].Country.map((m) => {
                return {
                    id: m.id,
                    filter: m.filter,
                    tag: m.tag,
                };
            }),
            Guid: MediaContainer.Metadata[0].Guid.map((m) => {
                return {
                    id: m.id,
                };
            }),
            Rating: MediaContainer.Metadata[0].Rating.map((m) => {
                return {
                    image: m.image,
                    value: m.value,
                    type: m.type,
                };
            }),
            Director: MediaContainer.Metadata[0].Director.map((m) => {
                return {
                    id: m.id,
                    filter: m.filter,
                    tag: m.tag,
                    tagKey: m.tagKey,
                    thumb: m.thumb,
                };
            }),
            Writer: MediaContainer.Metadata[0].Writer.map((m) => {
                return {
                    id: m.id,
                    filter: m.filter,
                    tag: m.tag,
                    tagKey: m.tagKey,
                    thumb: m.thumb,
                };
            }),
            Role: MediaContainer.Metadata[0].Role.map((m) => {
                return {
                    id: m.id,
                    filter: m.filter,
                    tag: m.tag,
                    tagKey: m.tagKey,
                    role: m.role,
                    thumb: m.thumb,
                };
            }),
            Producer: MediaContainer.Metadata[0].Producer.map((m) => {
                return {
                    id: m.id,
                    filter: m.filter,
                    tag: m.tag,
                    tagKey: m.tagKey,
                    thumb: m.thumb,
                };
            }),
        });
    }
}
export const libraryControllers = new LibraryControllers();
