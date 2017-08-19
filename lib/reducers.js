import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'


const auth = handleActions({
  ADD_TOKEN: (state, action) => Object.assign({}, state, {
    token: action.payload.token
  }),
  ADD_USER_INFO: (state, action) => Object.assign({}, state, {
    user: action.payload.user
  })
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
  ADD_CONFERENCE_BY_ID: (state, action) => {
    const { entities } = action.payload
    console.log("entities => ", action.payload)
    const { conferences, videos, speakers, tags } = entities

    return Object.assign({}, state, {
      videos: Object.assign({}, state.videos, videos),
      conferences: Object.assign({}, state.items, conferences),
      tags: Object.assign({}, state.tags, tags),
      speakers: Object.assign({}, state.speakers, speakers)
    })
  }
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
