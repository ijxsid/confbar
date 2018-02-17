import fetch from 'isomorphic-unfetch'
import config from '../config'
import { makeQueryString } from './utils'

export default {
  fetchFeatured: () => {
    return fetch(`${config.backend.base}${config.backend.api}featured/`)
  },
  fetchConferences: ({ page, search } = {}) => {
    return fetch(`${config.backend.base}${config.backend.api}conferences/${makeQueryString({ page, search })}`)
  },
  fetchSpeakers: ({ page, search } = {}) => {
    return fetch(`${config.backend.base}${config.backend.api}speakers/${makeQueryString({ page, search })}`)
  },
  fetchTags: ({ page, search } = {}) => {
    return fetch(`${config.backend.base}${config.backend.api}technologies/${makeQueryString({ page, search })}`)
  },
  fetchConfById: (id) => {
    return fetch(`${config.backend.base}${config.backend.api}conferences/${id}/`)
  },
  fetchVideoById: (id) => {
    return fetch(`${config.backend.base}${config.backend.api}videos/${id}/`)
  },
  fetchSpeakerById: (id) => {
    return fetch(`${config.backend.base}${config.backend.api}speakers/${id}/`)
  },
  fetchTagById: (id) => {
    return fetch(`${config.backend.base}${config.backend.api}technologies/${id}/`)
  },
  fetchUserInfo: (token) => {
    return fetch(`${config.backend.base}${config.backend.api}me/`, {
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json'
      }
    })
  },
  updateVideo: (token, video) => {
    return fetch(`${config.backend.base}${config.backend.api}videos/${video._id}`, {
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(video)
    })
  },
  addNewConference: (token, conference) => {
    return fetch(`${config.backend.base}${config.backend.api}conferences/`, {
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(conference)
    })
  },
  addNewSpeaker: (token, speaker) => {
    return fetch(`${config.backend.base}${config.backend.api}speakers/`, {
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(speaker)
    })
  },
  addNewTag: (token, tag) => {
    return fetch(`${config.backend.base}${config.backend.api}technologies/`, {
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(tag)
    })
  }
}
