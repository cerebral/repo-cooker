import { readableCommand } from 'repo-cooker/helpers/execCommand'

export function runCommandMock() {
  const commands = []
  const cmd = function runCommand(cmd, args, options) {
    commands.push(readableCommand(cmd, args, options))
    return Promise.resolve([])
  }
  cmd.commands = commands
  return cmd
}
