import Service from './Service'

/**
 * action types
 */
// UI actions
export const HIDE_ACCOUNT_FORM = 'HIDE_ACCOUNT_FORM'
export const SHOW_ACCOUNT_FORM = 'SHOW_ACCOUNT_FORM'
// Data actions
export const ADD_ACCOUNT = 'ADD_ACCOUNT'
export const EDIT_ACCOUNT = 'EDIT_ACCOUNT'
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT'
export const SELECT_ACCOUNT = 'SELECT_ACCOUNT'
export const RECEIVED_ACCOUNTS = 'RECEIVED_ACCOUNTS'

/**
 * Load accounts
 */
const receivedAccounts = entities => ({
  type: RECEIVED_ACCOUNTS,
  entities
})
const loadAll = () =>
  dispatch =>
    Service
      .retrieve()
      .then(entities => dispatch(receivedAccounts(entities)))

/**
 * Create account
 */
const addAccount = entity => ({
  type: ADD_ACCOUNT,
  entity
})
const createAccount = values =>
  dispatch =>
    Service
      .create(values)
      .then(entity => dispatch(addAccount(entity)))
      .then(() => dispatch(hideForm()))

/**
 * Edit account
 */
const editAccount = entity => ({
  type: EDIT_ACCOUNT,
  entity
})
const updateAccount = (id, values) =>
  dispatch =>
    Service
      .update(id, values)
      .then(entity => dispatch(editAccount(entity)))
      .then(() => dispatch(hideForm()))

/**
 * Delete account
 */
const removeAccount = id => ({
  type: REMOVE_ACCOUNT,
  id
})
const deleteAccount = id =>
  dispatch =>
    Service
      .remove(id)
      .then(() => dispatch(removeAccount(id)))

/**
 *
 * UI actions
 *
 */
const showForm = id => ({
  type: SHOW_ACCOUNT_FORM,
  id
})
const hideForm = () => ({
  type: HIDE_ACCOUNT_FORM
})

export const actions = {
  showForm,
  hideForm,
  loadAll,
  createAccount,
  updateAccount,
  deleteAccount
}
