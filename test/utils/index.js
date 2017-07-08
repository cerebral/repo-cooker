import { resolve, join } from 'path'
export { testAction } from './testAction'
export { testActionThrows } from './testActionThrows'

const path = resolve(join(__dirname, '..', 'repo'))

export const config = { path, devtools: null }

export function testRun() {
  const commands = []
  const cmd = function runCommand(cmd, args, options) {
    commands.push(`${cmd} ${args.join(' ')} ${JSON.stringify(options)}`)
    return Promise.resolve([])
  }
  cmd.commands = commands
  return cmd
}
