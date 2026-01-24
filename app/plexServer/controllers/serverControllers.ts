import { Request, Response } from "express"
import plexAPI from "../../config/plex.js"
import { plexToken, plexClient } from "../../config/plex.js"
import fetch from "node-fetch"

export class ServerControllers {
  private plexAPI = plexAPI

  async getDevices(req: Request, res: Response): Promise<void> {
    const response = await this.plexAPI.devices.listDevices()
    res.status(200).json(response)
  }

  async getServerCapabilities(req: Request, res: Response): Promise<void> {
    const identity = await this.plexAPI.general.getIdentity()
    res.status(200).json({ identity })
  }

  async getServerPreferences(req: Request, res: Response): Promise<void> {
    const response = await this.plexAPI.preferences.getAllPreferences()
    res.status(200).json(response)
  }

  async getServerResources(req: Request, res: Response): Promise<void> {
    const response = await fetch("https://plex.tv/api/v2/resources", {
      method: "get",
      headers: {
        Accept: "application/json",
        "X-Plex-Token": plexToken,
        "X-Plex-Client-Identifier": plexClient,
      },
    })

    const data = await response.json()

    res.status(200).json({ resources: data })
  }
}

export const serverControllers = new ServerControllers()
