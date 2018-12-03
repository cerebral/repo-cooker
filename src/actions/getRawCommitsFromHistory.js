import { runAll } from '../helpers/runAll'

export function getRawCommitsFromHistory({ props, git }) {
  return runAll(props.history.map(git.getCommit))
    .then(rawCommits => rawCommits.sort((a, b) => (a.date < b.date ? -1 : 1)))
    .then(rawCommits => ({ rawCommits }))
}
