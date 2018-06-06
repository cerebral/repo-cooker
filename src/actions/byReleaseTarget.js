const TO_RE = /^--release-to=(.+)$/
const DEFAULT_GIT_HOST = 'github'

export function byReleaseTarget({ path, props }) {
  let gitHost = DEFAULT_GIT_HOST
  const arg = props.argv.find(arg => TO_RE.exec(arg))
  if (arg) {
    gitHost = TO_RE.exec(arg)[1]
  }
  if (path[gitHost]) {
    return path[gitHost]()
  } else {
    throw new Error(
      `Cannot release to '${gitHost}' (can only release to ${Object.keys(
        path
      ).join(', ')}).`
    )
  }
}
