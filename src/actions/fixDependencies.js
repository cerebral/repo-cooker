import { fs } from './helpers'
import { join } from 'path'

const dependencyTypes = ['dependencies', 'devDependencies']
const logRed = msg => console.log(`\x1b[31m${msg}\x1b[0m`)
const logYellow = msg => console.log(`\x1b[33m${msg}\x1b[0m`)
const installCmd = {
  dependencies: 'npm install --save --save-exact',
  devDependencies: 'npm install --save-dev --save-exact',
}

/*
  Given a `checkDependencies` object in props, either fix installs
  (if --fix-deps is set) or throw an error. Also fails if there are
  any conflicts.
*/
export function fixDependencies({ config, packageJson, props }) {
  const autofix = props.argv.includes('--fix-dependencies')
  const monorepoPath = join(config.path, 'package.json')
  const monorepo = JSON.parse(fs.readFileSync(monorepoPath, 'utf8'))

  let needInstall = false
  let hasConflicts = false

  const { checkDependencies } = props
  if (!checkDependencies) {
    throw new Error(
      `No 'checkDependencies' in props. Missing 'checkDependencies' action ?`
    )
  }

  dependencyTypes.forEach(dependencyType => {
    const { toInstall, conflict } = checkDependencies[dependencyType]

    if (conflict.length) {
      hasConflicts = true
      logRed(`${dependencyType} CONFLICT`)
      conflict.forEach(c => console.log(JSON.stringify(c, null, 2)))
    }

    if (toInstall.length) {
      needInstall = true
      if (autofix) {
        // Update monorepo dependency information
        const dependencies = monorepo[dependencyType] || {}
        toInstall.forEach(info => {
          dependencies[info.dependency] = info.version
        })
        monorepo[dependencyType] = dependencies
        logYellow(`${dependencyType} UPDATE`)
        console.log(toInstall.map(info => `${info.dependency}@${info.version}`))
      } else {
        logRed(`${dependencyType} TO INSTALL`)
        console.log(
          `${installCmd[dependencyType]} ${toInstall
            .map(info => `${info.dependency}@${info.version}`)
            .join(' ')}`
        )
      }
    }
  })

  if (hasConflicts || (needInstall && !autofix)) {
    const msgs = []
    if (needInstall) {
      msgs.push('need install')
    }
    if (hasConflicts) {
      msgs.push('have conflicts')
    }
    throw new Error(`Dependencies ${msgs.join(' and ')}.`)
  }

  if (needInstall && autofix) {
    fs.writeFileSync(
      monorepoPath,
      JSON.stringify(monorepo, null, 2) + '\n',
      'utf-8'
    )
  }

  return {
    fixDependencies: needInstall ? 'fixed' : 'noop',
  }
}
