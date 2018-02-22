import config from '../config'
import fetch from 'isomorphic-unfetch'

const TOKEN = config.confbar.token
const apiBase = config.confbar.api.base
const videosAPI = `${apiBase}/api/videos`
const confsAPI = `${apiBase}/api/conferences`
const speakersAPI = `${apiBase}/api/speakers`
const techAPI = `${apiBase}/api/technologies`
const channelsAPI = `${apiBase}/api/channels`

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

export async function addChannel (channelData) {
  const res = await fetch(channelsAPI, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${TOKEN}`
    },
    method: 'POST',
    body: JSON.stringify(channelData)
  })
  const data = await res.json()

  return data
}

export async function updateChannel (id, channelData) {
  const res = await fetch(`${channelsAPI}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${TOKEN}`
    },
    method: 'PUT',
    body: JSON.stringify(channelData)
  })
  const data = await res.json()

  return data
}
export async function getChannels (page) {
  const res = await fetch(`${channelsAPI}?page=${page}`)
  const data = await res.json()
  return data
}

export async function getConferences (page) {
  const res = await fetch(`${confsAPI}?page=${page}`)
  const data = await res.json()
  return data
}
export async function getSpeakers (page) {
  const res = await fetch(`${speakersAPI}?page=${page}`)
  const data = await res.json()
  return data
}

export async function getTechnologies (page) {
  const res = await fetch(`${techAPI}?page=${page}`)
  const data = await res.json()
  return data
}
export async function updateConf (id, confData) {
  const res = await fetch(`${confsAPI}/${id}/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${TOKEN}`
    },
    method: 'PUT',
    body: JSON.stringify(confData)
  })
  const data = await res.json()

  return data
}

export async function updateSpeaker (id, speakerData) {
  const res = await fetch(`${speakersAPI}/${id}/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${TOKEN}`
    },
    method: 'PUT',
    body: JSON.stringify(speakerData)
  })
  const data = await res.json()

  return data
}
export async function updateTechnology (id, techData) {
  const res = await fetch(`${techAPI}/${id}/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${TOKEN}`
    },
    method: 'PUT',
    body: JSON.stringify(techData)
  })
  const data = await res.json()

  return data
}
