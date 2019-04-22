import { ENDPOINTS } from '../constants'
import $http from '../Common/Http'

class Service {
  constructor (api) {
    this.api = api
  }

  retrieve () {
    return this.api.get(ENDPOINTS.ACCOUNT_GET_ALL).then(response => {
      return response.data.entities
    })
  }

  create (values) {
    return this.api.post(ENDPOINTS.ACCOUNT_CREATE, values).then(response => {
      return response.data.entity
    })
  }

  update (id, values) {
    let endpoint = ENDPOINTS.ACCOUNT_UPDATE.replace(/:id/i, id)
    return this.api.put(endpoint, values).then(response => {
      return response.data.entity
    })
  }

  remove (id) {
    let endpoint = ENDPOINTS.ACCOUNT_UPDATE.replace(/:id/i, id)
    return this.api.delete(endpoint).then(response => {
      return response.data.success
    })
  }
}

export default new Service($http)
