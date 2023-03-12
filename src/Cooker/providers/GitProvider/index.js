import { Provider } from 'function-tree'
import { getBranches } from './getBranches'
import { getCommit } from './getCommit'
import { getCurrentBranch } from './getCurrentBranch'
import { getHashListFromHash } from './getHashListFromHash'
import { getLatestTagMatchingName } from './getLatestTagMatchingName'
import { restoreRepository } from './restoreRepository'

export function GitProvider({ path, runCommand }) {
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
