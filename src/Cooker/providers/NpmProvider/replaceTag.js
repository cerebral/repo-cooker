export function replaceTag(config) {
  const { runCommand, packagesPaths } = config

  return function replaceTag(packageName, fromTag, toTag) {
    const cwd = packagesPaths[packageName]

    return runCommand('npm', ['dist-tag', 'add', packageName, toTag], {
      cwd,
    }).then(() =>
      runCommand('npm', ['dist-tag', 'rm', packageName, fromTag], { cwd })
    )
  }
}
