import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { put, takeEvery, call } from 'redux-saga/effects'

import './index.css'
import App from './App'

// REDUX STUFF

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
)

const store = createStore(
  (state = {}, action) => {
    if (action.type === 'COMPONENT_ACTION') {
      return { ...state, componentAction_executed: true }
    }
    if (action.type === 'STORE_RESPONSE') {
      return { ...state, users: action.payload }
    }
    return state
  },
  enhancer
)

sagaMiddleware.run(mainSaga)

// API CALL

function getUsers() {
  return fetch('https://gorest.co.in/public-api/users?_format=json&access-token=Ue-_Pik6uiAt-jopQmWC23xleYcRH0ZMTP2w')
    .then(response => {
      if (!response.ok) {
        throw Error(response.status)
      }
      return response.json()
    })
}

// SAGAS STUFF

function* componentActionSaga(action) {
  console.log('and I am componentAction saga', action)
  const response = yield(call(getUsers))
  yield(put({ type: 'STORE_RESPONSE', payload: response.result }))
}

function* mainSaga() {
  console.log('I am the main saga')
  yield takeEvery('COMPONENT_ACTION', componentActionSaga)
}

// RENDER

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
