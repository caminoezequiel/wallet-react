import Service from './Service'

/**
 * action types
 */
// UI actions
export const HIDE_TRANSACTION_FORM = 'HIDE_TRANSACTION_FORM'
export const SHOW_TRANSACTION_FORM = 'SHOW_TRANSACTION_FORM'
// Data actions
export const ADD_TRANSACTION = 'ADD_TRANSACTION'
export const EDIT_TRANSACTION = 'EDIT_TRANSACTION'
export const REMOVE_TRANSACTION = 'REMOVE_TRANSACTION'
export const RECEIVED_TRANSACTIONS = 'RECEIVED_TRANSACTIONS'

/**
 * Load Transactions
 */
const receivedTransactions = entities => ({
  type: RECEIVED_TRANSACTIONS,
  entities
})
const loadAll = () =>
  dispatch =>
    Service
      .retrieve()
      .then(entities => dispatch(receivedTransactions(entities)))

/**
 * Create Transactions
 */
const addTransaction = entity => ({
  type: ADD_TRANSACTION,
  entity
})
const createTransaction = values =>
  dispatch =>
    Service
      .create(values)
      .then(entity => dispatch(addTransaction(entity)))
      .then(() => dispatch(hideForm()))
/**
 * Update transaction
 */
const editTransaction = entity => ({
  type: EDIT_TRANSACTION,
  entity
})
const updateTransaction = (id, values) =>
  dispatch =>
    Service
      .update(id, values)
      .then(entity => dispatch(editTransaction(entity)))
      .then(() => dispatch(hideForm()))

/**
 * Delete Transaction
 */
const removeTransaction = id => ({
  type: REMOVE_TRANSACTION,
  id
})

const deleteTransaction = id =>
  dispatch =>
    Service
      .remove(id)
      .then(() => dispatch(removeTransaction(id)))

/**
 *
 * UI actions
 *
 */
const showForm = id => ({
  type: SHOW_TRANSACTION_FORM,
  id
})
const hideForm = () => ({
  type: HIDE_TRANSACTION_FORM
})

export const actions = {
  showForm,
  hideForm,
  loadAll,
  createTransaction,
  updateTransaction,
  deleteTransaction
}
