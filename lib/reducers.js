import { handleActions } from "redux-actions"
import { combineReducers } from "redux"
import { confNormalizer, videoNormalizer, speakerNormalizer, tagNormalizer } from "./normalizers"

const intialState = {
  auth: {
    token: undefined,
    user: {}
  },
  data: {
    isFetching: false,
    videos: {},
    conferences: {},
    speakers: {},
    tags: {},
    editing: {
      search: {
        searchConf: '',
        searchTag: '',
        searchSpeaker: '',
        isSearching: false
      },
      add: {
        conference: {},
        speaker: {},
        tag: {}
      }
    }
  }
}

const updateEachEntity = (prevEntity = {}, nextEntity = {}) => {
  const keys = Object.keys(prevEntity).concat(Object.keys(nextEntity))
  return keys.reduce((acc, key) => {
    return { ...acc, [key]: { ...prevEntity[key], ...nextEntity[key] } }
  },
  {}
  )
}
const updateEntities = (prevState, nextState) => {
  const { entities } = nextState
  const { conferences, videos, speakers, tags } = entities
  return {
    ...prevState,
    ...{
      videos: updateEachEntity(prevState.videos, videos),
      tags: updateEachEntity(prevState.tags, tags),
      speakers: updateEachEntity(prevState.speakers, speakers),
      conferences: updateEachEntity(prevState.conferences, conferences)
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
  intialState.auth
)

const data = handleActions(
  {
    FETCHING_CONFERENCES: (state, action) => ({ ...state, ...{ isFetching: true } }),
    ADD_CONFERENCES: (state, action) => updateEntities(
      state,
      confNormalizer.normalizeConfs(action.payload)
    ),
    ADD_SPEAKERS: (state, action) => updateEntities(
      state,
      speakerNormalizer.normalizeSpeakers(action.payload)
    ),
    ADD_TAGS: (state, action) => updateEntities(
      state,
      tagNormalizer.normalizeTags(action.payload)
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
      const editing = { ...state.editing,
        ...{
          type: 'video',
          id: action.payload.videoId,
          form: state.videos[action.payload.videoId],
          isEditing: true
        }
      }
      return { ...state, editing }
    },
    RESET_EDIT_VIDEO: (state, action) => {
      return { ...state, editing: intialState.data.editing }
    },
    EDIT_FORM: (state, action) => {
      const form = { ...state.editing.form, [action.payload.field]: action.payload.value }
      const editing = { ...state.editing, form }
      return { ...state, editing }
    },
    EDIT_SEARCH: (state, action) => {
      const search = { ...state.editing.search, [action.payload.field]: action.payload.value }
      const editing = { ...state.editing, search }
      return { ...state, editing }
    },
    SET_SEARCHING: (state, action) => {
      const search = { ...state.editing.search, isSearching: action.payload.isSearching }
      const editing = { ...state.editing, search }
      return { ...state, editing }
    },
    EDIT_ADD_FORM: (state, action) => {
      const { type, field, value } = action.payload
      const newForm = { ...state.editing.add[type], [field]: value }
      const add = { ...state.editing.add, [type]: newForm }
      const editing = { ...state.editing, add }
      return { ...state, editing }
    }
  },
  intialState.data
)


export default combineReducers({
  auth,
  data
})
