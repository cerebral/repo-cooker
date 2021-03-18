import { Provider } from 'function-tree'
import { createRelease } from './createRelease'
import { execCommand, logCommand } from '../../../helpers/execCommand'

export function GithubProvider({ path, runCommand }) {
  if (process.env.REPO_COOKER_GITHUB_TOKEN === undefined) {
    const message = `Github provider needs an OAUTH token in env REPO_COOKER_GITHUB_TOKEN.`
    if (runCommand === execCommand) {
      throw new Error(message)
    } else if (runCommand === logCommand) {
      console.warn(message)
    }
  }

  return new Provider({
    createRelease(tagName, body) {
      // Has side effects so we wrap with runCommand
      return runCommand(createRelease, [path, tagName, body])
    },
  })
}
export default GithubProvider
