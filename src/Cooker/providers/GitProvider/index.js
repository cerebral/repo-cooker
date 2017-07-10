import { createTagForCommit } from './createTagForCommit'
import { getCommit } from './getCommit'
import { getHashListFromHash } from './getHashListFromHash'
import { getLatestTagMatchingName } from './getLatestTagMatchingName'
import { resetRepository } from './resetRepository'

export function GitProvider({ path, runCommand }) {
  return context => {
    context.git = {
      createTagForCommit(tag, message = '', ref = 'HEAD') {
        // Has side effects so we wrap with runCommand
        return runCommand(createTagForCommit, [path, tag, message, ref])
      },
      getCommit(hash) {
        return getCommit(path, hash)
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
      resetRepository(type = 'hard', ref = 'HEAD') {
        // Has side effects so we wrap with runCommand
        return runCommand(resetRepository, [path, type, ref])
      },
    }
    return context
  }
}
