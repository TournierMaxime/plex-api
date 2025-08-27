import expressAsyncHandler from "express-async-handler";
import { serverControllers } from "../controllers/serverControllers.js";
const configureServerRoutes = (app) => {
    app.get("/api/v1/myplex/account/", expressAsyncHandler((req, res) => serverControllers.getMyPlexAccount(req, res)));
};
export { configureServerRoutes };
