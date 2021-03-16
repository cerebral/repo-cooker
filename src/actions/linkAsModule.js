import { existsSync, mkdirSync } from 'fs'
import { dirname } from 'path'
import symlinkDir from 'symlink-dir'
import { resolve } from '../helpers/path'
import { runAll } from '../helpers/runAll'

// Alias to show 'linkAsModule'
const linkOne = function linkAsModule(sourcePackage, pkgAsModule) {
  return new Promise((resolve, reject) => {
    const dir = dirname(pkgAsModule)
    if (!existsSync(dir)) {
      mkdirSync(dir)
    }
    symlinkDir(sourcePackage, pkgAsModule).then(
      () => {
        resolve(true)
      },
      err => {
        console.warn(
          `Cannot create symlink '${pkgAsModule}' (there is a directory there probably).`
        )
        reject(err)
      }
    )
  })
}

export function linkAsModule({ config }) {
  const { runCommand } = config
  const packages = Object.keys(config.packagesPaths)
  const nodeModules = resolve(config.path, 'node_modules')

  return runAll(
    packages.map(name =>
      runCommand(linkOne, [
        config.packagesPaths[name],
        resolve(nodeModules, name),
      ])
    )
  ).then(results => ({
    [`linkAsModule`]: Object.assign(
      {},
      ...results.map((result, idx) => ({
        [packages[idx]]: result,
      }))
    ),
  }))
}
