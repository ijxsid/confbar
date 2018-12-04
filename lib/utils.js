import config from '../config'
import { fetchUserInfo, authActions } from './actions'
import queryString from 'query-string'

export const getFullLink = (type, item) => {
  return `${config.frontend.base}/${type}/${item._id}`
}

export const getFBShareLink = (type, item) => {
  return `https://www.facebook.com/sharer/sharer.php?u=${getFullLink(type, item)}`
}

export const getTwitterShareLink = (status) => {
  return `https://twitter.com/home?status=${status}`
}


export function setupUser (req, store) {
  const token = req.cookies.token
  if (token) {
    store.dispatch(authActions.addToken(req.cookies.token))
    return store.dispatch(fetchUserInfo(token))
  }
}


export function textToSlug (text) {
  // Reference: https://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export function makeQueryString (obj) {
  const queryString = Object.keys(obj)
    .filter(key => obj[key])
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
    .join("&")
  return queryString ? `?${queryString}` : ''
}

export function cleanQuery(obj) {
  const cleanedObj = Object.keys(obj).reduce((acc, key) => {
    const value = obj[key]
    if (Array.isArray(value) && value.length === 0) {
      return acc
    } else if (typeof value === 'string' && value.length === 0) {
      return acc
    } else {
      return { ...acc, [key]: value }
    }
  }, {})
  return queryString.stringify(cleanedObj)
}


const isUrlAbsolute = (url) => (url.indexOf('://') > 0 || url.indexOf('//') === 0)

export function getImage (url) {
  return url && config.frontend.imageServer && !isUrlAbsolute(url) ?
    `${config.frontend.imageServer}${url}` :
    url
}

export function getSpeakerAvatar (speaker) {
  return speaker.avatar ?
    getImage(speaker.avatar) :
    `https://avatars.io/twitter/${speaker.twitterUsername}`
}
