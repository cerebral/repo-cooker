export function publish(config) {
  const { runCommand, packagesPaths } = config

  return function publish(packageName, tag) {
    const cwd = packagesPaths[packageName]
    return runCommand('npm', ['publish', '--tag', tag, '--access', 'public'], {
      cwd,
      pause: true,
    })
  }
}
