import { Provider } from 'function-tree'
import { getBranches } from './getBranches'
import { getCommit } from './getCommit'
import { getCurrentBranch } from './getCurrentBranch'
import { getHashListFromHash } from './getHashListFromHash'
import { getLatestTagMatchingName } from './getLatestTagMatchingName'
import { join } from '../../../helpers/path'
import { restoreRepository } from './restoreRepository'

export function GitProvider({ path, runCommand }) {
  // GITHUB_WORKSPACE environment variable is used in github actions
  if (process.env.GITHUB_WORKSPACE) {
    path = join(process.env.GITHUB_WORKSPACE, path)
  }

  return new Provider({
    createTagForCommit(tag, message = '') {
      return runCommand('git', [
        'tag',
        '-a',
        tag,
        '-m',
        JSON.stringify(message),
      ])
    },
    getBranches() {
      return getBranches(path)
    },
    getCommit(hash) {
      return getCommit(path, hash)
    },
    getCurrentBranch() {
      return getCurrentBranch(path)
    },
    getHashListFromHash(hash) {
      return getHashListFromHash(path, hash)
    },
    getLatestTagMatchingName(tag) {
      return getLatestTagMatchingName(path, tag)
    },
    pushTagToRemote(tagName, remoteName = 'origin') {
      return runCommand('git', ['push', remoteName, tagName])
    },
    restoreRepository() {
      // Has side effects so we wrap with runCommand
      return runCommand(restoreRepository, [path])
    },
  })
}
export default GitProvider
