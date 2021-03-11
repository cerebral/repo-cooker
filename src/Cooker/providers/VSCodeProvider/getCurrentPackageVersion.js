import request from 'request'

const RE = /<title>.*v([0-9.]+)<\/title>/
const BADGES_URL = 'https://vsmarketplacebadge.apphb.com/version-short'

const cache = {}
export function getCurrentPackageVersion(name, packageJson) {
  return new Promise((resolve, reject) => {
    if (cache[name] !== undefined) {
      return resolve(cache[name])
    }

    const url = `${BADGES_URL}/${packageJson.publisher}.${packageJson.name}.svg`
    request.get(url, (error, response, body) => {
      if (response && response.statusCode === 404) {
        cache[name] = null
        return resolve(cache[name])
      }

      if (error) {
        return reject(error)
      }

      const re = RE.exec(body)
      if (!re) {
        return reject(
          new Error(
            `Could not scrape url '${url}' for vscode extension version.`
          )
        )
      }

      cache[name] = re[1]
      resolve(cache[name])
    })
  })
}
