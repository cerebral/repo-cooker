export function replaceTag(config) {
  const { runCommand, packagesPaths } = config

  return function replaceTag(packageName, version, fromTag, toTag) {
    const cwd = packagesPaths[packageName]

    return runCommand(
      'npm',
      ['dist-tag', 'add', `${packageName}@${version}`, toTag],
      {
        cwd,
      }
    ).then(() =>
      runCommand('npm', ['dist-tag', 'rm', packageName, fromTag], { cwd })
    )
  }
}
