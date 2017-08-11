import { createActions } from 'redux-actions'

export const authActions = createActions({
  ADD_TOKEN: token => ({ token }),
  ADD_USER_INFO: user => ({ user })
})
