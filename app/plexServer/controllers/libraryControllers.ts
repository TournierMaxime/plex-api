import { Request, Response } from "express"
import plexAPI from "../../config/plex.js"
import { plexToken } from "../../config/plex.js"

class LibraryControllers {
  private plexAPI = plexAPI

  /*   async getAllLibraries(req: Request, res: Response): Promise<void> {
    const response = await this.plexAPI.library.getAllLibraries()
    res.status(200).json(response)
  } */

  async fetchPlexRaw(path: string) {
    const base = `${process.env.PLEX_SERVER_PROTOCOL}://${process.env.PLEX_SERVER_IP}:${process.env.PLEX_SERVER_PORT}`
    const url = `${base}${path}${
      path.includes("?") ? "&" : "?"
    }X-Plex-Token=${plexToken}`

    const r = await fetch(url, { headers: { Accept: "application/json" } })
    const text = await r.text()
    const ct = r.headers.get("content-type") ?? ""
    return { status: r.status, ct, text }
  }

  async getAllLibraries(req: Request, res: Response) {
    const { status, ct, text } = await this.fetchPlexRaw("/library/sections")
    res.status(status).type("application/json").send(text)
  }

  async getAllMediaLibrary(req: Request, res: Response) {
    const { sectionKey } = req.params
    const { type, offset, limit } = req.query

    const { status, ct, text } = await this.fetchPlexRaw(
      `/library/sections/${sectionKey}/all?type=${type}&X-Plex-Container-Start=${offset}&X-Plex-Container-Size=${limit}`
    )
    res.status(status).type("application/json").send(text)
  }

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

export const libraryControllers = new LibraryControllers()
