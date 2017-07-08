import { readFile, writeFile } from 'fs'
import { serializeCommand } from 'repo-cooker/Cooker/execCommand'

export function DryRun() {
  const commands = []
  const cmd = function runCommand(cmd, args, options) {
    commands.push(serializeCommand(cmd, args, options))
    return Promise.resolve([])
  }
  cmd.commands = commands
  return cmd
}
