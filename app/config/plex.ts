import { PlexAPI } from "@lukehagar/plexjs"

const plexAPI = new PlexAPI({
  protocol: process.env.PLEX_SERVER_PROTOCOL as "http" | "https",
  ip: process.env.PLEX_SERVER_IP,
  port: process.env.PLEX_SERVER_PORT,
  accessToken: process.env.PLEX_SERVER_TOKEN,
})

export default plexAPI
