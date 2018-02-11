import config from '../config'
import fetch from 'isomorphic-unfetch'

const TOKEN = config.confbar.token
const apiBase = config.confbar.api.base
const videosAPI = `${apiBase}/api/videos`

const speakersAPI = `${apiBase}/api/speakers`
const techAPI = `${apiBase}/api/technologies`

export async function addVideo (videoData) {
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

export async function editVideo (id, videoData) {
  const url = `${apiBase}/api/videos/${id}`
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${TOKEN}`
    },
    method: 'PUT',
    body: JSON.stringify(videoData)
  })
  const data = await res.json()

  return data
}


export async function addSpeaker (speaker) {
  const res = await fetch(speakersAPI, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${TOKEN}`
    },
    method: 'POST',
    body: JSON.stringify(speaker)
  })
  const data = await res.json()
  return data
}

export async function addTech (techData) {
  const res = await fetch(techAPI, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${TOKEN}`
    },
    method: 'POST',
    body: JSON.stringify(techData)
  })
  const data = await res.json()
  return data
}