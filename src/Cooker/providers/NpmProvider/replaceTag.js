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
    ).then(
      () =>
        new Promise((resolve, reject) =>
          // We accept failure for this operation (somehow this happens for no reason
          // when everything is OK).
          runCommand('npm', ['dist-tag', 'rm', packageName, fromTag], {
            cwd,
          })
            .then(result => resolve(result))
            .catch(err => {
              console.log(err)
              resolve('')
            })
        )
    )
  }
}
