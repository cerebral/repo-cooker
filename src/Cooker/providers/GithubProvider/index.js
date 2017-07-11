import { createRelease } from './createRelease'

export function GithubProvider({ path, runCommand }) {
  return context => {
    context.github = {
      createRelease(tagName, body, target = 'master') {
        // Has side effects so we wrap with runCommand
        return runCommand(createRelease, [path, tagName, body, target])
      },
    }
    return context
  }
}
