import { ENDPOINTS } from '../constants'
import $http from '../Common/Http'
import Session from '../Common/Session'

class Service {
  constructor (api) {
    this.api = api
  }

  signIn (email, password) {
    return this.api.post(ENDPOINTS.AUTH_SIGN_IN, {email, password}).then(response => {
      if (response.status === 200 && response.data.success) {
        Session.create(response.data.payload.token, response.data.payload.user)
      }
      return response.data
    }, e => {
      if (e && e.response && e.response.status === 422) {
        return e.response.data
      }
      return false
    })
  }

  signUp (name, email, password) {
    return this.api.post(ENDPOINTS.AUTH_SIGN_UP, {name, email, password}).then(response => {
      return response.data
    }, e => {
      if (e && e.response && e.response.status === 422) {
        return e.response.data
      }
      return false
    })
  }
}

export default new Service($http)
