import axios from 'axios'
import registryUrlFn from 'registry-url'

const registryUrl = registryUrlFn()

const cache = {}
export function getFromNpmRegistry(packageName) {
  return new Promise((resolve, reject) => {
    if (cache[packageName]) {
      return resolve(cache[packageName])
    }

    axios
      .get(`${registryUrl}${packageName.replace('/', '%2F')}`)
      .then((response) => {
        cache[packageName] = response.data
        resolve(cache[packageName])
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          cache[packageName] = null
          return resolve(cache[packageName])
        } else {
          reject(new Error(error))
        }
      })
  })
}
