import { PlexAPI } from "@lukehagar/plexjs";
export const plexToken = process.env.PLEX_SERVER_TOKEN;
export const plexClient = process.env.PLEX_CLIENT_IDENTIFIER;
const plexAPI = new PlexAPI({
    protocol: process.env.PLEX_SERVER_PROTOCOL,
    ip: process.env.PLEX_SERVER_IP,
    port: process.env.PLEX_SERVER_PORT,
    accessToken: process.env.PLEX_SERVER_TOKEN,
});
export default plexAPI;
