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
  const packagesPaths = packages.map(k =>
    resolve(config.packagesPaths[k]).slice(0, -k.length - 1)
  )
  let commonPath = packagesPaths[0]
  while (packagesPaths.find(p => !p.startsWith(commonPath))) {
    commonPath = dirname(commonPath)
  }
  if (commonPath.includes('node_modules')) {
    // packages are stored in a folder called node_modules: no link needed
    return { ['linkAsModule']: {} }
  }
  const nodeModules = resolve(commonPath, 'node_modules')
  if (!existsSync(nodeModules)) {
    runCommand(mkdirSync, [nodeModules])
  }

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
