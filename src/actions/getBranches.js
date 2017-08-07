export function getBranches({ git }) {
  return git.getBranches().then(branches => ({ branches }))
}
