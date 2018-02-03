import { createActions } from 'redux-actions'
import confAPI from './confAPI'
import { confById, videoById, speakerById, tagById } from './normalizers'

export const authActions = createActions({
  ADD_TOKEN: token => ({ token }),
  ADD_USER_INFO: user => ({ user })
},
'PERFORM_LOGOUT'
)

export const confActions = createActions({
  ADD_CONFERENCES: conferences => ({ conferences }),
  ADD_CONFERENCE_BY_ID: (data) => (data),
  ADD_VIDEO_BY_ID: (data) => (data),
  ADD_SPEAKER_BY_ID: data => data,
  ADD_TAG_BY_ID: data => data
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
      .then(data => confById.normalize(data))
      .then(data => dispatch(confActions.addConferenceById(data)))
      .catch(err => console.log(err))
  }
}

export const fetchVideoById = (id) => {
  return (dispatch) => {
    return confAPI.fetchVideoById(id)
      .then(resp => resp.json())
      .then(data => videoById.normalize(data))
      .then(data => dispatch(confActions.addVideoById(data)))
      .catch(err => console.log(err))
  }
}

export const fetchSpeakerById = (id) => {
  return (dispatch) => {
    return confAPI.fetchSpeakerById(id)
      .then(resp => resp.json())
      .then(data => speakerById.normalize(data))
      .then(data => dispatch(confActions.addSpeakerById(data)))
      .catch(err => console.log(err))
  }
}


export const fetchTagById = (id) => {
  return (dispatch) => {
    return confAPI.fetchTagById(id)
      .then(resp => resp.json())
      .then(data => tagById.normalize(data))
      .then(data => dispatch(confActions.addTagById(data)))
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
