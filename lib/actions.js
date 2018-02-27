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

export const paginationActions = createActions({
  INCREMENT_PAGE: model => ({ model }),
  SET_HAS_ENDED: model => ({ model }),
  SET_FETCHING: (model, fetching) => ({ model, fetching })
})

export const confActions = createActions({
  ADD_CONFERENCES: data => data,
  ADD_SPEAKERS: data => data,
  ADD_TAGS: data => data,
  ADD_VIDEOS: data => data,
  ADD_CONFERENCE_BY_ID: data => data,
  ADD_VIDEO_BY_ID: data => data,
  ADD_SPEAKER_BY_ID: data => data,
  ADD_TAG_BY_ID: data => data,
  ADD_FEATURED_DATA: data => data,
  CHANGE_SEARCH: term => ({ term }),
  SET_SEARCHING: isSearching => ({ isSearching })
},
'FETCHING_CONFERENCES'
)

export const performSearch = term => (dispatch, getState) => {
  dispatch(confActions.setSearching(true))
  dispatch(confActions.changeSearch(term))

  return confAPI.fetchSearchResults({ search: term })
    .then(resp => resp.json())
    .then(({ conferences, speakers, tags, videos }) => {
      dispatch(confActions.setSearching(false))
      dispatch(confActions.addConferences(conferences))
      dispatch(confActions.addSpeakers(speakers))
      dispatch(confActions.addTags(tags))
      dispatch(confActions.addVideos(videos))
    })
}

export const fetchFeatured = () => {
  return (dispatch) => {
    return confAPI.fetchFeatured()
      .then(resp => resp.json())
      .then(featured => dispatch(confActions.addFeaturedData(featured)))
  }
}
export const doFetchConferences = () => {
  return (dispatch, getState) => {
    const { page, hasEnded } = getState().pagination.conference
    if (!hasEnded) {
      dispatch(paginationActions.setFetching('conference', true))
      return confAPI.fetchConferences({ page })
        .then((confs) => confs.json())
        .then(data => {
          if (data.length < 20) {
            dispatch(paginationActions.setHasEnded('conference'))
          } else {
            dispatch(paginationActions.incrementPage('conference'))
          }
          dispatch(confActions.addConferences(data))
          dispatch(paginationActions.setFetching('conference', false))
        })
    }
  }
}

export const doFetchTags = () => {
  return (dispatch, getState) => {
    const { page, hasEnded } = getState().pagination.tag
    if (!hasEnded) {
      dispatch(paginationActions.setFetching('tag', true))
      return confAPI.fetchTags({ page })
        .then((confs) => confs.json())
        .then(data => {
          if (data.length < 20) {
            dispatch(paginationActions.setHasEnded('tag'))
          } else {
            dispatch(paginationActions.incrementPage('tag'))
          }
          dispatch(confActions.addTags(data))
          dispatch(paginationActions.setFetching('tag', false))
        })
    }
  }
}

export const doFetchSpeakers = () => {
  return (dispatch, getState) => {
    const { page, hasEnded } = getState().pagination.speaker
    if (!hasEnded) {
      dispatch(paginationActions.setFetching('speaker', true))
      return confAPI.fetchSpeakers({ page })
        .then((confs) => confs.json())
        .then(data => {
          if (data.length < 20) {
            dispatch(paginationActions.setHasEnded('speaker'))
          } else {
            dispatch(paginationActions.incrementPage('speaker'))
          }
          dispatch(confActions.addSpeakers(data))
          dispatch(paginationActions.setFetching('speaker', false))
        })
    }
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
  ADMIN_SET_SEARCHING: (isSearching) => ({ isSearching })
},
'RESET_EDIT_VIDEO'
)

export const editVideo = (videoId) => (dispatch, getState) =>
  dispatch(adminActions.startEditVideo(getState().data.videos[videoId]))

export const searchConferences = (field, term) => {
  return dispatch => {
    dispatch(adminActions.editSearch(field, term))
    dispatch(adminActions.adminSetSearching(true))
    return confAPI.fetchConferences({ search: term })
      .then(confs => confs.json())
      .then(data => {
        dispatch(adminActions.adminSetSearching(false))
        return dispatch(confActions.addConferences(data))
      })
  }
}
export const searchSpeakers = (field, term) => {
  return dispatch => {
    dispatch(adminActions.editSearch(field, term))
    dispatch(adminActions.adminSetSearching(true))
    return confAPI.fetchSpeakers({ search: term })
      .then(speakers => speakers.json())
      .then(data => {
        dispatch(adminActions.adminSetSearching(false))
        return dispatch(confActions.addSpeakers(data))
      })
  }
}

export const searchTags = (field, term) => {
  return dispatch => {
    dispatch(adminActions.editSearch(field, term))
    dispatch(adminActions.adminSetSearching(true))
    return confAPI.fetchTags({ search: term })
      .then(tags => tags.json())
      .then(data => {
        dispatch(adminActions.adminSetSearching(false))
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
