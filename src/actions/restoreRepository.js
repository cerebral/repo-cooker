export function restoreRepository({ git }) {
  return git.restoreRepository().then(() => ({}))
}
