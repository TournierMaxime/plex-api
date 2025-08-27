import expressAsyncHandler from "express-async-handler"
import { Application } from "express"
import { hubControllers } from "../controllers/hubControllers.js"

const configureHubRoutes = (app: Application) => {
  app.get(
    "/api/v1/plex/hubs/",
    expressAsyncHandler((req, res) => hubControllers.getGlobalHubs(req, res))
  )
  app.get(
    "/api/v1/plex/hubs/sections/:sectionId",
    expressAsyncHandler((req, res) => hubControllers.getLibraryHubs(req, res))
  )
}

export { configureHubRoutes }
