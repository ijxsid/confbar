import fetch from 'isomorphic-unfetch'
import config from '../config'

export default {
  fetchConferences: () => {
    console.log("Fetching....")
    return fetch(`${config.backend.base}${config.backend.api}conferences/`)
  },
  fetchUserInfo: (token) => {
    return fetch(`${config.backend.base}${config.backend.api}me/`, {
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json'
      }
    })
  }
}
