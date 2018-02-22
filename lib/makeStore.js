import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'

const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
  compose

export default (initialState) => {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware
      )
    )
  )
}
