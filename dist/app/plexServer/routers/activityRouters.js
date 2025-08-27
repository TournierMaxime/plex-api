import expressAsyncHandler from "express-async-handler";
import { activityControllers } from "../controllers/activityControllers.js";
const configureActivityRoutes = (app) => {
    app.get("/api/v1/plex/activities/", expressAsyncHandler((req, res) => activityControllers.getServerActivities(req, res)));
};
export { configureActivityRoutes };
