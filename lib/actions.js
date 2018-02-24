import { createActions } from 'redux-actions'
import confAPI from './confAPI'

export const authActions = createActions({
  ADD_TOKEN: token => ({ token }),
  ADD_USER_INFO: user => ({ user })
},
'PERFORM_LOGOUT'
)

export const fetchUserInfo = (token) => {
  return dispatch => {
    return confAPI.fetchUserInfo(token)
      .then(resp => resp.json())
      .then((profile) => dispatch(authActions.addUserInfo(profile)))
  }
}

export const confActions = createActions({
  ADD_CONFERENCES: data => data,
  ADD_SPEAKERS: data => data,
  ADD_TAGS: data => data,
  ADD_CONFERENCE_BY_ID: data => data,
  ADD_VIDEO_BY_ID: data => data,
  ADD_SPEAKER_BY_ID: data => data,
  ADD_TAG_BY_ID: data => data,
  ADD_FEATURED_DATA: data => data
},
'FETCHING_CONFERENCES'
)

export const fetchFeatured = () => {
  return (dispatch) => {
    return confAPI.fetchFeatured()
      .then(resp => resp.json())
      .then(featured => dispatch(confActions.addFeaturedData(featured)))
  }
}
export const doFetchConferences = () => {
  return (dispatch) => {
    dispatch(confActions.fetchingConferences())
    return confAPI.fetchConferences()
      .then((confs) => confs.json())
      .then(data => dispatch(confActions.addConferences(data)))
  }
}
export const doFetchTags = () => {
  return (dispatch) => {
    return confAPI.fetchTags()
      .then((tags) => tags.json())
      .then(data => dispatch(confActions.addTags(data)))
  }
}
export const doFetchSpeakers = () => {
  return (dispatch) => {
    return confAPI.fetchSpeakers()
      .then((speakers) => speakers.json())
      .then(data => dispatch(confActions.addSpeakers(data)))
  }
}

export const fetchConfById = (id) => {
  return (dispatch) => {
    return confAPI.fetchConfById(id)
      .then(resp => resp.json())
      .then(data => dispatch(confActions.addConferenceById(data)))
      .catch(err => console.log(err))
  }
}

export const fetchVideoById = (id) => {
  return (dispatch) => {
    return confAPI.fetchVideoById(id)
      .then(resp => resp.json())
      .then(data => dispatch(confActions.addVideoById(data)))
      .catch(err => console.log(err))
  }
}

export const fetchSpeakerById = (id) => {
  return (dispatch) => {
    return confAPI.fetchSpeakerById(id)
      .then(resp => resp.json())
      .then(data => dispatch(confActions.addSpeakerById(data)))
      .catch(err => console.log(err))
  }
}

export const fetchTagById = (id) => {
  return (dispatch) => {
    return confAPI.fetchTagById(id)
      .then(resp => resp.json())
      .then(data => dispatch(confActions.addTagById(data)))
      .catch(err => console.log(err))
  }
}

export const adminActions = createActions({
  START_EDIT_VIDEO: (video) => ({ video }),
  EDIT_FORM: (field, value) => ({ field, value }),
  EDIT_SEARCH: (field, value) => ({ field, value }),
  EDIT_ADD_FORM: (type, field, value) => ({ type, field, value }),
  RESET_ADD_FORM: type => ({ type }),
  SET_SEARCHING: (isSearching) => ({ isSearching })
},
'RESET_EDIT_VIDEO'
)

export const editVideo = (videoId) => (dispatch, getState) =>
  dispatch(adminActions.startEditVideo(getState().data.videos[videoId]))

export const searchConferences = (field, term) => {
  return dispatch => {
    dispatch(adminActions.editSearch(field, term))
    dispatch(adminActions.setSearching(true))
    return confAPI.fetchConferences({ search: term })
      .then(confs => confs.json())
      .then(data => {
        dispatch(adminActions.setSearching(false))
        return dispatch(confActions.addConferences(data))
      })
  }
}
export const searchSpeakers = (field, term) => {
  return dispatch => {
    dispatch(adminActions.editSearch(field, term))
    dispatch(adminActions.setSearching(true))
    return confAPI.fetchSpeakers({ search: term })
      .then(speakers => speakers.json())
      .then(data => {
        dispatch(adminActions.setSearching(false))
        return dispatch(confActions.addSpeakers(data))
      })
  }
}

export const searchTags = (field, term) => {
  return dispatch => {
    dispatch(adminActions.editSearch(field, term))
    dispatch(adminActions.setSearching(true))
    return confAPI.fetchTags({ search: term })
      .then(tags => tags.json())
      .then(data => {
        dispatch(adminActions.setSearching(false))
        return dispatch(confActions.addTags(data))
      })
  }
}


export const updateVideo = () => {
  return (dispatch, getState) => {
    const state = getState()
    const token = state.auth.token
    const video = state.editor.form

    return confAPI.updateVideo(token, video)
      .then(resp => resp.json())
      .then((video) => {
        dispatch(adminActions.resetEditVideo())
        dispatch(confActions.addVideoById(video))
      })
  }
}

export const addNewConference = () => {
  return (dispatch, getState) => {
    const state = getState()
    const token = state.auth.token
    const conference = state.editor.add.conference

    return confAPI.addNewConference(token, conference)
      .then(resp => resp.json())
      .then((conference) => {
        dispatch(confActions.addConferenceById({ conference }))
        dispatch(adminActions.editForm('conference', conference._id))
        dispatch(adminActions.resetAddForm('conference'))
      })
  }
}

export const addNewSpeaker = () => {
  return (dispatch, getState) => {
    const state = getState()
    const token = state.auth.token
    const speaker = state.editor.add.speaker

    return confAPI.addNewSpeaker(token, speaker)
      .then(resp => resp.json())
      .then((speaker) => {
        dispatch(confActions.addSpeakerById({ speaker }))
        dispatch(adminActions.editForm('speaker', speaker._id))
        dispatch(adminActions.resetAddForm('speaker'))
      })
  }
}


export const addNewTag = () => {
  return (dispatch, getState) => {
    const state = getState()
    const token = state.auth.token
    const tag = state.editor.add.tag

    return confAPI.addNewTag(token, tag)
      .then(resp => resp.json())
      .then((tag) => {
        dispatch(confActions.addTagById({ tag }))
        dispatch(adminActions.editForm('tags', tag._id))
        dispatch(adminActions.resetAddForm('tag'))
      })
  }
}
