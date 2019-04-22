import Cache from './Cache'

class Session {
  getUser = () => Cache.pull('user-data')
  getToken = () => Cache.pull('user-token')

  create (token, user) {
    Cache.push('user-data', JSON.stringify(user))
    Cache.push('user-token', token)
  }

  destroy () {
    Cache.delete('user-data')
    Cache.delete('user-token')
  }
}

export default new Session()
