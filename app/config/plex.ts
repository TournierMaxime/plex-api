import { PlexAPI } from "@lukehagar/plexjs"

export const plexToken = process.env.PLEX_SERVER_TOKEN!
export const plexClient = process.env.PLEX_CLIENT_IDENTIFIER!

const plexAPI = new PlexAPI({
  fullServerUrl: process.env.PLEX_SERVER_URL,
})

export default plexAPI
