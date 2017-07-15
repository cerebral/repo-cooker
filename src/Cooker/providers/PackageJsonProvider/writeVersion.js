import { join } from 'path'
import { readFile, writeFile } from 'fs'

const options = { encoding: 'utf8' }

function getPackageDetails(path) {
  return new Promise((resolve, reject) => {
    readFile(path, options, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(data))
      }
    })
  })
}

export function writeVersion({ runCommand, packagesPaths }) {
  return function writeVersion(packageName, version) {
    const path = join(packagesPaths[packageName], 'package.json')

    return getPackageDetails(path)
      .then(details => Object.assign({}, details, { version }))
      .then(newDetails =>
        runCommand(writeFile, [
          path,
          JSON.stringify(newDetails, null, 2),
          options,
        ])
      )
  }
}
