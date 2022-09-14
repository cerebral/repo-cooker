export function publish(config) {
  const { runCommand, packagesPaths } = config

  return function publish(packageName, tag) {
    const cwd = packagesPaths[packageName]
    return runCommand(
      'npm',
      ['publish', '--tag', tag, '--access', 'public'].concat(
        process.env.REPO_COOKER_NPM_OTP
          ? [`--otp=${process.env.REPO_COOKER_NPM_OTP}`]
          : []
      ),
      {
        cwd,
        pause: true,
      }
    )
  }
}
