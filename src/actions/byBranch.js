export function byBranch({ git, path }) {
  return git.getCurrentBranch().then(branch => {
    return path[branch.name] ? path[branch.name]() : path.otherwise()
  })
}
