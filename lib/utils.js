import config from '../config'
import { fetchUserInfo, authActions } from './actions'


export const getFullLink = (type, item) => {
  return `${config.frontend.base}/${type}/${item._id}`;
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
