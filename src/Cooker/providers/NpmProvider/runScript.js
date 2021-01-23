import { getPackageInfo } from '../PackageJsonProvider/helpers'

export function runScript(config) {
  const { runCommand, packagesPaths } = config

  return function runScript(packageName, scriptName, args = []) {
    const cwd = packagesPaths[packageName]
    return getPackageInfo(packageName, cwd)
      .then(info => (info.scripts || {})[scriptName])
      .then(exists =>
        exists
          ? runCommand('npm', ['run', scriptName, ...args], {
              cwd,
            })
              .then(output => ({ pass: true, output }))
              .catch(error => ({ pass: false, error }))
          : false
      )
  }
}
