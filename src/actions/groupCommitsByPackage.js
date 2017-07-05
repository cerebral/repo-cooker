export function groupCommitsByPackage(callback) {
  return function groupCommitsByPackage({ props }) {
    const packages = {}
    const commitsByPackage = []
    props.commits.forEach(commit => {
      const doneForCommit = {}
      callback(commit).filter(name => !!name).forEach(name => {
        if (!doneForCommit[name]) {
          // A commit can notify the same package name multiple times
          doneForCommit[name] = true
          if (!packages[name]) {
            const group = { name, commits: [commit] }
            packages[name] = group
            commitsByPackage.push(group)
          } else {
            packages[name].commits.push(commit)
          }
        }
      })
    })
    return { commitsByPackage }
  }
}
