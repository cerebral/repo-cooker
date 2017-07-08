import { serializeCommand } from 'repo-cooker/Cooker/execCommand'

export function DryRun(path) {
  const commands = []
  const cmd = function runCommand(cmd, args, options) {
    commands.push(serializeCommand(cmd, args, options, path))
    return Promise.resolve([])
  }
  cmd.commands = commands
  return cmd
}
