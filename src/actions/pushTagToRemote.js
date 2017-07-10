export function pushTagToRemote({ git, props: { tag } }) {
  return git.pushTagToRemote(tag.name, 'origin').then(() => ({}))
}
