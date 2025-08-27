import expressAsyncHandler from "express-async-handler";
import { libraryControllers } from "../controllers/libraryControllers.js";
const configureLibraryRoutes = (app) => {
    app.get("/api/v1/plex/library/sections", expressAsyncHandler((req, res) => libraryControllers.getAllLibraries(req, res)));
};
export { configureLibraryRoutes };
