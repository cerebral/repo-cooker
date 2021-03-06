import { runAll } from '../helpers/runAll'

export function getRawCommitsFromHistory({ props, git }) {
  return runAll(props.history.map(hash => git.getCommit(hash)))
    .then(rawCommits => rawCommits.sort((a, b) => (a.date < b.date ? -1 : 1)))
    .then(rawCommits => ({ rawCommits }))
}
