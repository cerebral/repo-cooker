import request from 'request'
import registryUrlFn from 'registry-url'

const registryUrl = registryUrlFn()

const cache = {}
export function getFromNpmRegistry(packageName) {
  return new Promise((resolve, reject) => {
    if (cache[packageName]) {
      return resolve(cache[packageName])
    }

    request.get(`${registryUrl}${packageName}`, (error, _, body) => {
      if (error) {
        return reject(error)
      }
      cache[packageName] = JSON.parse(body)
      resolve(cache[packageName])
    })
  })
}
