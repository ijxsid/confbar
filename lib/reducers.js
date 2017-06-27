import { createStore } from 'redux'

const reducer = (state = { foo: '', token: undefined }, action) => {
  switch (action.type) {
  case 'FOO':
    return { ...state, foo: action.payload }
  case 'ADD_TOKEN':
    return { ...state, token: action.token }
  default:
    return state
  }
}


export const makeStore = (initialState) => {
  return createStore(reducer, initialState)
}
