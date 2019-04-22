class Cache {
  push (key, data) {
    localStorage.setItem(key, data)
  }

  pull (key) {
    return localStorage.getItem(key)
  }

  delete (key) {
    localStorage.removeItem(key)
  }
}

export default new Cache()
