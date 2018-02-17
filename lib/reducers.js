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
    featured: [],
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
        conference: {
          name: '',
          year: '',
          location: '',
          logo: '',
          startDate: '',
          endData: ''
        },
        speaker: {
          name: '',
          twitterUsername: '',
          website: '',
          blog: '',
          github: '',
          location: ''
        },
        tag: {
          name: '',
          description: '',
          website: '',
          logo: '',
          blog: '',
          repo: ''
        }
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

const addSingleFeature = (state, feature) => {
  let nextState = state
  let normalized
  switch (feature.type) {
  case 'Video':
    normalized = videoNormalizer.normalizeVideos(feature.items)
    break
  case 'Conference':
    normalized = confNormalizer.normalizeConfs(feature.items)
    break
  case 'Speaker':
    normalized = speakerNormalizer.normalizeSpeakers(feature.items)
    break
  case 'Technology':
    normalized = tagNormalizer.normalizeTags(feature.items)
    break
  default:
    return nextState
  }
  nextState = updateEntities(state, normalized)
  // NOTE: could have used normalized.result to put just item ids in the feature.items, but
  // the I decided not to go through the normalizing - denormializing cycle for this thing.
  return { ...nextState, featured: [...state.featured, feature] }
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
    ADD_FEATURED_DATA: (state, action) => {
      const featured = action.payload
      const nextState = featured.reduce(addSingleFeature, state)
      return { ...nextState }
    },
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
      let value = action.payload.value
      if (action.payload.field === 'tags') {
        const prevValue = state.editing.form[action.payload.field]
        if (prevValue.indexOf(value) < 0) {
          value = prevValue.concat([value])
        }
      }
      const form = { ...state.editing.form, [action.payload.field]: value }
      const editing = { ...state.editing, form }
      return { ...state, editing }
    },
    RESET_ADD_FORM: (state, action) => {
      const type = action.payload.type
      const add = { ...state.editing.add, [type]: intialState.data.editing.add[action.payload.type] }
      const editing = { ...state.editing, add }
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
