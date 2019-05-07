import * as actionTypes from './actions'
import Transaction from './Model/Transaction'

const defaultState = {
  entity: null,
  showForm: false,
  entities: []
}

export default function transactionReducer (state = defaultState, action) {
  if (action.type === actionTypes.RECEIVED_TRANSACTIONS) {
    return Object.assign({}, state, {
      entities: action.entities
    })
  }
  if (action.type === actionTypes.ADD_TRANSACTION) {
    return Object.assign({}, state, {
      entities: [...state.entities, action.entity]
    })
  }
  if (action.type === actionTypes.EDIT_TRANSACTION) {
    let id = action.entity._id
    return Object.assign({}, state, {
      entities: state.entities.map(e => (e._id !== id) ? e : action.entity)
    })
  }

  if (action.type === actionTypes.REMOVE_TRANSACTION) {
    return Object.assign({}, state, {
      entities: state.entities.filter(item => (item._id !== action.id))
    })
  }

  if (action.type === actionTypes.SHOW_TRANSACTION_FORM) {
    let entity = null
    if (action.id) {
      let item = state.entities.find(e => e._id === action.id)
      entity = new Transaction(
        item._id,
        item.type,
        item.amount,
        item.account._id || item.account,
        item.category,
        item.datetime
      )
    }
    return Object.assign({}, state, {
      showForm: true,
      entity: entity || new Transaction()
    })
  }

  if (action.type === actionTypes.HIDE_TRANSACTION_FORM) {
    return Object.assign({}, state, {
      entity: null,
      showForm: false
    })
  }
  return state
}
