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
    isSearching: false,
    search: '',
    lastSearchedAt: 0
  },
  pagination: {
    conference: {
      isFetching: false,
      page: 0,
      hasEnded: false,
      sortAndFilterTab: undefined,
      areFiltersApplied: false,
      filters: {
        search: '',
        tag: [],
        sortBy: ''
      }
    },
    video: {
      isFetching: false,
      page: 0,
      hasEnded: false
    },
    speaker: {
      isFetching: false,
      page: 0,
      hasEnded: false
    },
    tag: {
      isFetching: false,
      page: 0,
      hasEnded: false
    }
  },
  editor: {
    form: {},
    type: undefined,
    id: undefined,
    isEditing: false,
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
        url: '',
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
    ADD_VIDEOS: (state, action) => updateEntities(
      state,
      videoNormalizer.normalizeVideos(action.payload)
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
      let nextState = { ...state, featured: [] }
      nextState = featured.reduce(addSingleFeature, nextState)
      return { ...nextState }
    },
    SET_SEARCHING: (state, action) => {
      if (action.payload.isSearching === true) {
        return { ...state, isSearching: action.payload.isSearching }
      }
      return { ...state, isSearching: action.payload.isSearching, lastSearchedAt: Date.now() }
    },
    CHANGE_SEARCH: (state, action) => {
      return { ...state, search: action.payload.term }
    }
  },
  intialState.data
)

const editor = handleActions(
  {
    START_EDIT_VIDEO: (state, action) => {
      return { ...state,
        ...{
          type: 'video',
          id: action.payload.video._id,
          form: action.payload.video,
          isEditing: true
        }
      }
    },
    RESET_EDIT_VIDEO: (state, action) => {
      return intialState.data.editor
    },
    EDIT_FORM: (state, action) => {
      let value = action.payload.value
      if (action.payload.field === 'tags') {
        const prevValue = state.form[action.payload.field]
        if (prevValue.indexOf(value) < 0) {
          value = prevValue.concat([value])
        }
      }
      const form = { ...state.form, [action.payload.field]: value }
      return { ...state, form }
    },
    RESET_ADD_FORM: (state, action) => {
      const type = action.payload.type
      const add = { ...state.add, [type]: intialState.editor.add[action.payload.type] }
      return { ...state, add }
    },
    EDIT_SEARCH: (state, action) => {
      const search = { ...state.search, [action.payload.field]: action.payload.value }
      return { ...state, search }
    },
    ADMIN_SET_SEARCHING: (state, action) => {
      const search = { ...state.search, isSearching: action.payload.isSearching }
      return { ...state, search }
    },
    EDIT_ADD_FORM: (state, action) => {
      const { type, field, value } = action.payload
      const newForm = { ...state.add[type], [field]: value }
      const add = { ...state.add, [type]: newForm }
      return { ...state, add }
    }
  },
  intialState.editor
)

const pagination = handleActions(
  {
    INCREMENT_PAGE: (state, action) => {
      return {
        ...state,
        [action.payload.model]: {
          ...state[action.payload.model],
          page: state[action.payload.model].page + 1
        }
      }
    },
    RESET_PAGE: (state, action) => {
      return {
        ...state,
        [action.payload.model]: {
          ...state[action.payload.model],
          page: 0
        }
      }
    },
    SET_HAS_ENDED: (state, action) => {
      return {
        ...state,
        [action.payload.model]: {
          ...state[action.payload.model],
          hasEnded: true
        }
      }
    },
    SET_FETCHING: (state, action) => {
      return {
        ...state,
        [action.payload.model]: {
          ...state[action.payload.model],
          isFetching: action.payload.fetching
        }
      }
    },
    SET_FILTER_AND_SORT_TAB: (state, action) => {
      return {
        ...state,
        conference: {
          ...state.conference,
          sortAndFilterTab: action.payload.tabNo
        }
      }
    },
    SET_FILTERS: (state, action) => {
      const { key, value } = action.payload
      let filtersValue = state.conference.filters[key]
      if (key === 'tag' && !Array.isArray(value)) {
        if (filtersValue.indexOf(value) === -1) {
          filtersValue.push(value)
        } else {
          let valueIndex = filtersValue.indexOf(value)
          filtersValue = [...filtersValue.slice(0, valueIndex), ...filtersValue.slice(valueIndex + 1)]
        }
      } else {
        filtersValue = value
      }
      const filters = { ...state.conference.filters, [key]: filtersValue }
      return {
        ...state,
        conference: {
          ...state.conference,
          filters
        }
      }
    }
  }, intialState.pagination
)

export default combineReducers({
  auth,
  data,
  editor,
  pagination
})
