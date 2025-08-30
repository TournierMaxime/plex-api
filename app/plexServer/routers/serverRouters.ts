import expressAsyncHandler from "express-async-handler"
import { Application } from "express"
import { serverControllers } from "../controllers/serverControllers.js"

const configureServerRoutes = (app: Application) => {
  app.get(
    "/api/v1/plex/server/myplex/account/",
    expressAsyncHandler((req, res) =>
      serverControllers.getMyPlexAccount(req, res)
    )
  )
  app.get(
    "/api/v1/plex/server/devices/",
    expressAsyncHandler((req, res) => serverControllers.getDevices(req, res))
  )

  app.get(
    "/api/v1/plex/server/capabilities",
    expressAsyncHandler((req, res) =>
      serverControllers.getServerCapabilities(req, res)
    )
  )

  app.get(
    "/api/v1/plex/server/preferences",
    expressAsyncHandler((req, res) =>
      serverControllers.getServerPreferences(req, res)
    )
  )

  app.get(
    "/api/v1/plex/server/resources",
    expressAsyncHandler((req, res) =>
      serverControllers.getServerResources(req, res)
    )
  )
}

export { configureServerRoutes }
