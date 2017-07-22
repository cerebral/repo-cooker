import { createRelease } from './createRelease'
import { execCommand } from '../../../helpers/execCommand'

export function GithubProvider({ path, runCommand }) {
  if (process.env.GITHUB_TOKEN === undefined) {
    const message = `Github provider needs an OAUTH token in env GITHUB_TOKEN.`
    if (runCommand === execCommand) {
      throw new Error(message)
    } else {
      console.warn(message)
    }
  }

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
