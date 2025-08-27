import { Request, Response } from "express"
import plexAPI from "../../config/plex.js"

class ServerControllers {
  private plexAPI = plexAPI

  async getMyPlexAccount(req: Request, res: Response): Promise<void> {
    const response = await this.plexAPI.server.getMyPlexAccount()
    res.status(200).json(response)
  }

  async getDevices(req: Request, res: Response): Promise<void> {
    const response = await this.plexAPI.server.getDevices()
    res.status(200).json(response)
  }

  async getServerCapabilities(req: Request, res: Response): Promise<void> {
    const capabilities = await this.plexAPI.server.getServerCapabilities()
    const identity = await this.plexAPI.server.getServerIdentity()
    const clients = await this.plexAPI.server.getAvailableClients()
    const serverList = await this.plexAPI.server.getServerList()
    res.status(200).json({ capabilities, identity, clients, serverList })
  }

  async getServerPreferences(req: Request, res: Response): Promise<void> {
    const response = await this.plexAPI.server.getServerPreferences()
    res.status(200).json(response)
  }
}

export const serverControllers = new ServerControllers()
