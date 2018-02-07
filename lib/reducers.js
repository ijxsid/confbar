import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'

const updateEntities = (prevState, nextState) => {
  const { entities } = nextState
  const { conferences, videos, speakers, tags } = entities
  return { ...prevState,
    ...{
      videos: { ...prevState.videos, ...videos },
      tags: { ...prevState.tags, ...tags },
      speakers: { ...prevState.speakers, ...speakers },
      conferences: { ...prevState.conferences, ...conferences }
    }
  }
}


const auth = handleActions({
  ADD_TOKEN: (state, action) => Object.assign({}, state, {
    token: action.payload.token
  }),
  ADD_USER_INFO: (state, action) => Object.assign({}, state, {
    user: action.payload.user
  }),
  PERFORM_LOGOUT: (state, action) => ({ token: undefined, user: {} })
}, {
  token: undefined,
  user: {}
})

const data = handleActions({
  FETCHING_CONFERENCES: (state, action) => Object.assign({}, state, {
    isFetching: true
  }),
  ADD_CONFERENCES: (state, action) => {
    const newConfs = Object.assign({},
      state.conferences,
      action.payload.conferences.reduce((obj, el) => {
        obj[el._id] = el
        return obj
      }, {})
    )
    return Object.assign({}, state, { conferences: newConfs })
  },
  ADD_CONFERENCE_BY_ID: (state, action) => updateEntities(state, action.payload),
  ADD_VIDEO_BY_ID: (state, action) => updateEntities(state, action.payload),
  ADD_SPEAKER_BY_ID: (state, action) => updateEntities(state, action.payload),
  ADD_TAG_BY_ID: (state, action) => updateEntities(state, action.payload)
}, {
  isFetching: false,
  videos: {},
  conferences: {},
  speakers: {},
  tags: {}
})

export default combineReducers({
  auth,
  data
})
