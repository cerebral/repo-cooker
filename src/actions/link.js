import { existsSync, mkdirSync } from 'fs'
import { dirname } from 'path'
import symlinkDir from 'symlink-dir'
import { resolve } from '../helpers/path'
import { runAll } from '../helpers/runAll'

// Alias function so that function name is `link`, not `linkOne`.
const linkOne = function link(rootBin, packageBin) {
  return new Promise((resolve, reject) => {
    const dir = dirname(packageBin)
    if (!existsSync(dir)) {
      mkdirSync(dir)
    }
    symlinkDir(rootBin, packageBin).then(
      () => {
        resolve(true)
      },
      err => {
        console.warn(
          `Cannot create symlink '${packageBin}' (there is a directory there probably).`
        )
        reject(err)
      }
    )
  })
}

export function link({ config }) {
  const { runCommand } = config
  const packages = Object.keys(config.packagesPaths)
  const rootBin = resolve(config.path, 'node_modules', '.bin')

  return runAll(
    packages.map(name =>
      runCommand(linkOne, [
        rootBin,
        resolve(config.packagesPaths[name], 'node_modules', '.bin'),
      ])
    )
  ).then(results => ({
    [`link`]: Object.assign(
      {},
      ...results.map((result, idx) => ({
        [packages[idx]]: result,
      }))
    ),
  }))
}
