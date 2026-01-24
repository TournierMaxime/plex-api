import { PlexAPI } from "@lukehagar/plexjs";
export const plexToken = process.env.PLEX_SERVER_TOKEN;
export const plexClient = process.env.PLEX_CLIENT_IDENTIFIER;
const plexAPI = new PlexAPI({
    protocol: process.env.PLEX_SERVER_PROTOCOL,
    ipDescription: process.env.PLEX_SERVER_IP,
    port: process.env.PLEX_SERVER_PORT,
    fullServerUrl: process.env.PLEX_SERVER_URL,
});
export default plexAPI;
