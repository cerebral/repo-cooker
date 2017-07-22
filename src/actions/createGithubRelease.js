export function createGithubRelease({ props, github }) {
  return github
    .createRelease(props.tag.name, props.releaseNotes)
    .then(githubRelease => ({ githubRelease }))
}
