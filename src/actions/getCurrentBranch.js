export function getCurrentBranch({ git }) {
  return git.getCurrentBranch().then(branch => ({ branch }))
}
