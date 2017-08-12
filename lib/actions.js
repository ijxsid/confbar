import { createActions } from 'redux-actions'
import confAPI from './confAPI'

export const authActions = createActions({
  ADD_TOKEN: token => ({ token }),
  ADD_USER_INFO: user => ({ user })
})

export const confActions = createActions({
  ADD_CONFERENCES: items => ({ items })
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

export const fetchUserInfo = (token) => {
  return dispatch => {
    return confAPI.fetchUserInfo(token)
      .then(resp => resp.json())
      .then((profile) => dispatch(authActions.addUserInfo(profile)))
  }
}
