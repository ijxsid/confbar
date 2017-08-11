import { handleActions } from 'redux-actions'

export default handleActions({
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
