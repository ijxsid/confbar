import { createActions } from 'redux-actions'
import confAPI from './confAPI'

export const authActions = createActions({
  ADD_TOKEN: token => ({ token }),
  ADD_USER_INFO: user => ({ user })
})

export const confActions = createActions({
  ADD_CONFERENCES: items => ({ items }),
  ADD_CONFERENCE_BY_ID: (item, id) => ({ item, id })
},
'FETCHING_CONFERENCES'
)

export const doFetchConferences = () => {
  return (dispatch) => {
    dispatch(confActions.fetchingConferences())
    return confAPI.fetchConferences()
      .then((confs) => confs.json())
      .then((items) => dispatch(confActions.addConferences(items)))
  }
}

export const fetchConfById = (id) => {
  return (dispatch) => {
    return confAPI.fetchConfById(id)
      .then(resp => resp.json())
      .then(json => dispatch(confActions.addConferenceById(json, id)))
      .catch(err => console.log(err))
  }
}

export const fetchUserInfo = (token) => {
  return dispatch => {
    return confAPI.fetchUserInfo(token)
      .then(resp => resp.json())
      .then((profile) => dispatch(authActions.addUserInfo(profile)))
  }
}
