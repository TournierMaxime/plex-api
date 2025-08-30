import expressAsyncHandler from "express-async-handler"
import { Application } from "express"
import { userControllers } from "../controllers/userControllers.js"

const configureUserRoutes = (app: Application) => {
  app.get(
    "/api/v1/plex/users",
    expressAsyncHandler((req, res) => userControllers.getUsers(req, res))
  )
  app.get(
    "/api/v1/plex/users/:id/history",
    expressAsyncHandler((req, res) => userControllers.getUserHistory(req, res))
  )
}

export { configureUserRoutes }
