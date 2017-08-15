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

const conferences = handleActions({
  FETCHING_CONFERENCES: (state, action) => Object.assign({}, state, {
    isFetching: true
  }),
  ADD_CONFERENCES: (state, action) => {
    const newConfs = Object.assign({},
      state.items,
      action.payload.items.reduce((obj, el) => {
        obj[el._id] = el
        return obj
      }, {})
    )
    return Object.assign({}, state, { items: newConfs })
  },
  ADD_CONFERENCE_BY_ID: (state, action) => Object.assign({}, state, {
    items: Object.assign({}, state.items, {
      [action.payload.id]: action.payload.item
    })
  })
}, {
  isFetching: false,
  items: []
})

export default combineReducers({
  auth,
  conferences
})
