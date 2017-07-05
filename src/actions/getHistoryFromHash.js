export function getHistoryFromHash({ props, git }) {
  return git.getHashListFromHash(props.hash).then(commits => ({ commits }))
}
