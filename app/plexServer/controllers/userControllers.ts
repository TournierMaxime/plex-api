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

  async getUserHistory(req: Request, res: Response): Promise<void> {
    const { sort, accountId, librarySectionID, filter } = req.query

    const parsedSort = typeof sort === "string" ? sort : undefined

    const parsedAccountId =
      typeof accountId === "string" && !isNaN(Number(accountId))
        ? Number(accountId)
        : undefined

    const parsedLibrarySectionID =
      typeof librarySectionID === "string" && !isNaN(Number(librarySectionID))
        ? Number(librarySectionID)
        : undefined

    let parsedFilter: Record<string, any> | undefined
    if (typeof filter === "string") {
      try {
        parsedFilter = JSON.parse(filter)
      } catch (err) {
        res.status(400).json({ error: "Invalid filter JSON" })
      }
    }

    const [sessionsHistory, devices] = await Promise.all([
      this.plexAPI.sessions.getSessionHistory(
        parsedSort,
        parsedAccountId,
        parsedFilter,
        parsedLibrarySectionID
      ),
      this.plexAPI.server.getDevices(),
    ])

    const devicesArray = devices.object?.mediaContainer?.device ?? []

    const enrichedMetadata =
      sessionsHistory.object?.mediaContainer?.metadata
        ?.filter((a) => a.accountID === parsedAccountId)
        .map((item) => {
          const deviceMatch = devicesArray.find(
            (d) => String(d.id) === String(item.deviceID)
          )

          return {
            ...item,
            deviceName: deviceMatch?.name || "Unknown device",
          }
        }) ?? []

    res.status(200).json({
      sessionsHistory: {
        object: {
          mediaContainer: {
            size: enrichedMetadata.length,
            metaData: enrichedMetadata,
          },
        },
      },
    })
  }
}

export const userControllers = new UserControllers()
