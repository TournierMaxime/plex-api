import { HttpBadRequestError, HttpForbiddenError, HttpNotFoundError, HttpServerManager, HttpUnauthorizedError, Keys, } from "tm-api-common";
import { configureServerRoutes } from "./plexServer/routers/serverRouters.js";
export const keys = new Keys();
export const httpErrorServer = {
    HttpBadRequestError,
    HttpForbiddenError,
    HttpNotFoundError,
    HttpUnauthorizedError,
};
const httpServerManager = new HttpServerManager();
const app = httpServerManager.getExpressApp();
const configureRoutes = (app) => {
    configureServerRoutes(app);
};
configureRoutes(app);
console.log(process.env.PLEX_SERVER_PROTOCOL);
httpServerManager.startServer(Number(process.env.EXPRESS_PORT) || 3600);
