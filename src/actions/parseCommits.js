import { parseCommit } from '../helpers/parseCommit'

export function parseCommits({ props }) {
  return { parsedCommits: props.commits.map(parseCommit) }
}
