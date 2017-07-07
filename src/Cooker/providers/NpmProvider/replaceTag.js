export function replaceTag(config) {
  const { runCommand, getPackagePath } = config

  return function replaceTag(packageName, fromTag, toTag) {
    const cwd = getPackagePath(packageName)

    return runCommand('npm', ['dist-tag', 'add', packageName, toTag], {
      cwd,
    }).then(() =>
      runCommand('npm', ['dist-tag', 'rm', packageName, fromTag], { cwd })
    )
  }
}
