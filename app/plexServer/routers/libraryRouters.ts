import expressAsyncHandler from "express-async-handler"
import { Application } from "express"
import { libraryControllers } from "../controllers/libraryControllers.js"

const configureLibraryRoutes = (app: Application) => {
  app.get(
    "/api/v1/plex/library/sections",
    expressAsyncHandler((req, res) =>
      libraryControllers.getAllLibraries(req, res)
    )
  )
  app.get(
    "/api/v1/plex/library/sections/:sectionKey/all",
    expressAsyncHandler((req, res) =>
      libraryControllers.getAllMediaLibrary(req, res)
    )
  )
}

export { configureLibraryRoutes }
