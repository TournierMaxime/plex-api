import { Request, Response } from "express"
import plexAPI from "../../config/plex.js"

class HubControllers {
  private plexAPI = plexAPI

  async getGlobalHubs(req: Request, res: Response): Promise<void> {
    const response = await this.plexAPI.hubs.getGlobalHubs()
    res.status(200).json(response)
  }

  async getLibraryHubs(req: Request, res: Response): Promise<void> {
    const { sectionId } = req.params
    const response = await this.plexAPI.hubs.getLibraryHubs(Number(sectionId))
    res.status(200).json(response)
  }
}

export const hubControllers = new HubControllers()
