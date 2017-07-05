export function getCommitsContent({ props, git }) {
  return Promise.all(...props.commits.map(git.extractCommit)).then(commits => ({
    commitContents: commits,
  }))
}
