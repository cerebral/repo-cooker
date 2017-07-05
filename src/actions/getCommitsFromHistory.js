export function getCommitsFromHistory({ props, git }) {
  return Promise.all(props.history.map(git.getCommit))
    .then(commits => commits.sort((a, b) => (a.date < b.date ? -1 : 1)))
    .then(commits => ({ commits }))
}
