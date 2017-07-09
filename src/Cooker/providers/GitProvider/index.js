import { getCommit } from './getCommit'
import { getHashListFromHash } from './getHashListFromHash'
import { getLatestTagMatchingName } from './getLatestTagMatchingName'
import { resetRepository } from './resetRepository'

export function GitProvider({ path, runCommand }) {
  return context => {
    context.git = {
      resetRepository(ref = 'HEAD', type = 'hard') {
        // Has side effects so we wrap with runCommand
        return runCommand(resetRepository, [path, ref, type])
      },
      getCommit(hash) {
        return getCommit(path, hash)
      },
      getHashListFromHash(hash) {
        return getHashListFromHash(path, hash)
      },
      getLatestTagMatchingName(name) {
        return getLatestTagMatchingName(path, name)
      },
    }
    return context
  }
}
