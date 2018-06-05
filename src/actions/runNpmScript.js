export function runNpmScript(scriptNameTag, args = [], providedPackageNames) {
  return function runNpmScript({ config, props, npm, resolve }) {
    const scriptName = resolve.value(scriptNameTag)
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
