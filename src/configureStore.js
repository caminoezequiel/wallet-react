import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import accountReducer from './Account/reducer'
import transactionReducer from './Transaction/reducer'

export default function configureStore () {
  let middlewares = [thunkMiddleware]
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
  }
  return createStore(
    combineReducers({
      account: accountReducer,
      transaction: transactionReducer
    }),
    applyMiddleware(...middlewares)
  )
}
