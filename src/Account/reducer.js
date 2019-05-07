import * as actionTypes from './actions'
import Account from './Model/Account'

const defaultState = {
  entity: null,
  showForm: false,
  entities: []
}

export default function accountReducer (state = defaultState, action) {
  if (action.type === actionTypes.SELECT_ACCOUNT) {
    let entity = state.entities.find(e => e._id === action.id)
    return Object.assign({}, state, {entity})
  }
  if (action.type === actionTypes.RECEIVED_ACCOUNTS) {
    return Object.assign({}, state, {
      entities: action.entities
    })
  }
  if (action.type === actionTypes.ADD_ACCOUNT) {
    return Object.assign({}, state, {
      entities: [...state.entities, action.entity]
    })
  }
  if (action.type === actionTypes.EDIT_ACCOUNT) {
    let id = action.entity._id
    return Object.assign({}, state, {
      entities: state.entities.map(e => (e._id !== id) ? e : action.entity)
    })
  }
  if (action.type === actionTypes.REMOVE_ACCOUNT) {
    return Object.assign({}, state, {
      entities: state.entities.filter(item => (item._id !== action.id))
    })
  }

  if (action.type === actionTypes.SHOW_ACCOUNT_FORM) {
    let entity = null
    if (action.id) {
      entity = state.entities.find(e => e._id === action.id)
    }
    return Object.assign({}, state, {
      showForm: true,
      entity: entity || new Account()
    })
  }

  if (action.type === actionTypes.HIDE_ACCOUNT_FORM) {
    return Object.assign({}, state, {
      entity: null,
      showForm: false
    })
  }
  return state
}
