// Import through proxy for better error message.
import { nodegit } from './nodegit'
import { getBranches } from './getBranches'

export function getCurrentBranch(repoPath) {
  return nodegit.Repository.open(repoPath).then(repo =>
    repo
      .getHeadCommit()
      .then(commit => commit.sha())
      .then(hash =>
        getBranches(repoPath).then(branches =>
          branches.find(b => b.hash === hash)
        )
      )
  )
}
