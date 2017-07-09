export function resetRepository({ git }) {
  return git.resetRepository().then(() => ({}))
}
