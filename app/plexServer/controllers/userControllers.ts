import { Request, Response } from "express"
import plexAPI from "../../config/plex.js"
import { plexToken, plexClient } from "../../config/plex.js"

class UserControllers {
  private plexAPI = plexAPI

  async getUsers(req: Request, res: Response): Promise<void> {
    const response = await fetch("https://plex.tv/api/v2/home/users", {
      method: "get",
      headers: {
        Accept: "application/json",
        "X-Plex-Token": plexToken,
        "X-Plex-Client-Identifier": plexClient,
      },
    })

    const data = await response.json()

    res.status(200).json(data)
  }
}

export const userControllers = new UserControllers()
