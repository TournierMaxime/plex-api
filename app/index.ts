import {
  HttpBadRequestError,
  HttpForbiddenError,
  HttpNotFoundError,
  HttpServerManager,
  HttpUnauthorizedError,
  Keys,
} from "tm-api-common"
import { Application } from "express"
import { configureServerRoutes } from "./plexServer/routers/serverRouters.js"
import { configureActivityRoutes } from "./plexServer/routers/activityRouters.js"
import { configureHubRoutes } from "./plexServer/routers/hubRouters.js"
import { configureLibraryRoutes } from "./plexServer/routers/libraryRouters.js"

export const keys = new Keys()
export const httpErrorServer = {
  HttpBadRequestError,
  HttpForbiddenError,
  HttpNotFoundError,
  HttpUnauthorizedError,
}

const httpServerManager = new HttpServerManager()
const app = httpServerManager.getExpressApp()

const configureRoutes = (app: Application) => {
  configureServerRoutes(app)
  configureActivityRoutes(app)
  configureHubRoutes(app)
  configureLibraryRoutes(app)
}

configureRoutes(app)

httpServerManager.startServer(Number(process.env.EXPRESS_PORT) || 3600)
