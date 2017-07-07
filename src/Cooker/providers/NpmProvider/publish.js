export function publish(config) {
  const { runCommand, getPackagePath } = config

  return function publish(packageName, tag) {
    const cwd = getPackagePath(packageName)
    return runCommand('npm', ['publish', '--tag', tag], { cwd })
  }
}
