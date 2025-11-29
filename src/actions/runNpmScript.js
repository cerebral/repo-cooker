import { runAll } from '../helpers/runAll'

export function runNpmScript(scriptNameTag, args = [], providedPackageNames) {
  return function runNpmScript({ config, npm, resolve }) {
    const scriptName = resolve.value(scriptNameTag)
    const packages =
      providedPackageNames || Object.keys(config.packagesPaths).sort()

    return runAll(
      packages.map((name) => npm.runScript(name, scriptName, args))
    ).then((results) => {
      const failures = results.filter((result) => result && !result.pass)
      if (failures.length) {
        throw new Error(`running npm scripts '${scriptName}' failed.`)
      }
      return {
        [`${scriptName}NpmScript`]: Object.assign(
          ...results.map((result, idx) => ({
            [packages[idx]]: result,
          }))
        ),
      }
    })
  }
}
