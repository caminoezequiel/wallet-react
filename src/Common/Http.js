import axios from 'axios'
import config from '../config'
import Session from './Session'

class Http {
  constructor ($http) {
    this.$http = $http
  }

  /**
   * @param endpoint
   * @param params
   * @returns {AxiosPromise<any>}
   */
  get (endpoint, params = null) {
    const options = {
      params, // params ? {params} : {}
      headers: this.jwtHeaders()
    }
    return this.$http.get(endpoint, options)
  }

  jwtHeaders () {
    let token = Session.getToken()
    if (token) {
      return {
        Authorization: `Bearer ${token}`
      }
    }
    return {}
  }

  /**
   * @param endpoint
   * @param params
   * @returns {AxiosPromise<any>}
   */
  post (endpoint, params = {}) {
    return this.$http.post(endpoint, params, {headers: this.jwtHeaders()})
  }

  /**
   * @param endpoint
   * @param params
   * @returns {AxiosPromise<any> | IDBRequest | Promise<void>}
   */
  put (endpoint, params) {
    return this.$http.put(endpoint, params, {headers: this.jwtHeaders()})
  }

  delete (endpoint) {
    return this.$http.delete(endpoint, {headers: this.jwtHeaders()})
  }
}

export default new Http(axios.create({baseURL: config.API_URL}))
