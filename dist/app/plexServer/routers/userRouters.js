import expressAsyncHandler from "express-async-handler";
import { userControllers } from "../controllers/userControllers.js";
const configureUserRoutes = (app) => {
    app.get("/api/v1/plex/users", expressAsyncHandler((req, res) => userControllers.getUsers(req, res)));
    app.get("/api/v1/plex/users/:id/history", expressAsyncHandler((req, res) => userControllers.getUserHistory(req, res)));
};
export { configureUserRoutes };
