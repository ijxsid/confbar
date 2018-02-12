import { handleActions } from "redux-actions"
import { combineReducers } from "redux"
import { confNormalizer, videoNormalizer, speakerNormalizer, tagNormalizer } from "./normalizers"

const updateEntities = (prevState, nextState) => {
  const { entities } = nextState
  const { conferences, videos, speakers, tags } = entities
  return {
    ...prevState,
    ...{
      videos: { ...prevState.videos, ...videos },
      tags: { ...prevState.tags, ...tags },
      speakers: { ...prevState.speakers, ...speakers },
      conferences: { ...prevState.conferences, ...conferences }
    }
  }
}

const auth = handleActions(
  {
    ADD_TOKEN: (state, action) =>
      Object.assign({}, state, {
        token: action.payload.token
      }),
    ADD_USER_INFO: (state, action) =>
      Object.assign({}, state, {
        user: action.payload.user
      }),
    PERFORM_LOGOUT: (state, action) => ({ token: undefined, user: {} })
  },
  {
    token: undefined,
    user: {}
  }
)

const data = handleActions(
  {
    FETCHING_CONFERENCES: (state, action) => ({ ...state, ...{ isFetching: true } }),
    ADD_CONFERENCES: (state, action) => updateEntities(
      state,
      confNormalizer.normalizeConfs(action.payload)
    ),
    ADD_CONFERENCE_BY_ID: (state, action) => updateEntities(
      state,
      confNormalizer.normalizeById(action.payload)
    ),
    ADD_VIDEO_BY_ID: (state, action) => updateEntities(
      state,
      videoNormalizer.normalizeById(action.payload)
    ),
    ADD_SPEAKER_BY_ID: (state, action) => updateEntities(
      state,
      speakerNormalizer.normalizeById(action.payload)
    ),
    ADD_TAG_BY_ID: (state, action) => updateEntities(
      state,
      tagNormalizer.normalizeById(action.payload)
    ),
    START_EDIT_VIDEO: (state, action) => {
      return {
        ...state,
        ...{ editing: {
          type: 'video',
          id: action.payload.videoId,
          form: state.videos[action.payload.videoId],
          isEditing: true
        } }
      }
    }
  },
  {
    isFetching: false,
    videos: {},
    conferences: {},
    speakers: {},
    tags: {},
    editing: {}
  }
)


export default combineReducers({
  auth,
  data
})
