export default class Transaction {
  constructor (id = '', type = 'expense', amount = 0, account = '', category = '', datetime = new Date()) {
    this._id = id
    this.type = type
    this.amount = amount
    this.account = account
    this.category = category
    this.datetime = datetime
  }
}
