import { extractCommit } from './extractCommit'
import { getShaListFromSha } from './getShaListFromSha'
import { getLatestTagMatchingName } from './getLatestTagMatchingName'

export function GitProvider(context) {
  context.git = {
    extractCommit,
    getShaListFromSha,
    getLatestTagMatchingName,
  }

  return context
}
