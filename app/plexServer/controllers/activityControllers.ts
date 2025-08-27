import { Request, Response } from "express"
import plexAPI from "../../config/plex.js"

class ActivityControllers {
  private plexAPI = plexAPI

  async getServerActivities(req: Request, res: Response): Promise<void> {
    const response = await this.plexAPI.activities.getServerActivities()
    res.status(200).json(response)
  }
}

export const activityControllers = new ActivityControllers()
