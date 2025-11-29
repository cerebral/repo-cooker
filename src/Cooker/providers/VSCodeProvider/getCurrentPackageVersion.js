import axios from 'axios'

const RE = /<title>.*v([0-9.]+)<\/title>/
const BADGES_URL = 'https://vsmarketplacebadge.apphb.com/version-short'

const cache = {}
export function getCurrentPackageVersion(name, packageJson) {
  return new Promise((resolve, reject) => {
    if (cache[name] !== undefined) {
      return resolve(cache[name])
    }

    const url = `${BADGES_URL}/${packageJson.publisher}.${packageJson.name}.svg`

    axios
      .get(url)
      .then((response) => {
        const re = RE.exec(response.data)
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
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          cache[name] = null
          return resolve(cache[name])
        } else {
          reject(new Error(error))
        }
      })
  })
}
