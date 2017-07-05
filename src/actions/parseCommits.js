import { parseCommit } from '../helpers/parseCommit'

export function parseCommits({ props }) {
  return { commits: props.rawCommits.map(parseCommit) }
}
