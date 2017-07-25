export function runNpmScript(scriptName, args = [], providedPackageNames) {
  return function runNpmScript({ npm, config }) {
    const packages = providedPackageNames || Object.keys(config.packagesPaths)

    return Promise.all(
      packages.map(name => npm.runScript(name, scriptName, args))
    ).then(results => ({
      [`${scriptName}NpmScript`]: Object.assign(
        ...results.map((result, idx) => ({
          [packages[idx]]: result,
        }))
      ),
    }))
  }
}
