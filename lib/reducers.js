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
  ADD_CONFERENCES: (state, action) => Object.assign({}, state, {
    items: state.items.concat(action.payload.items)
  })
}, {
  isFetching: false,
  items: []
})

export default combineReducers({
  auth,
  conferences
})
