import config from '../config'
import fetch from 'isomorphic-unfetch'

const TOKEN = config.confbar.token
const apiBase = config.confbar.api.base


export async function addVideo (videoData) {
  const videosAPI = `${apiBase}/api/videos`
  const res = await fetch(videosAPI, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${TOKEN}`
    },
    method: 'POST',
    body: JSON.stringify(videoData)
  })
  const data = await res.json()

  return data
}
