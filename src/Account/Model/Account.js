export default class Account {
  constructor (name = '', currency = 'ARS', initAmount = 0) {
    this.name = name
    this.currency = currency
    this.initAmount = initAmount
  }
}
