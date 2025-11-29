export function publish(config) {
  const { runCommand, packagesPaths } = config

  return function publish(packageName) {
    const cwd = packagesPaths[packageName]
    return runCommand('vsce', ['publish'], {
      cwd,
    })
  }
}
