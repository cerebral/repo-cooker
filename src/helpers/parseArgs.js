import { builtinSignals } from '../signals'

const builtinRe = /^--builtin=(.+)$/
const releaseRe = /^--release(=(.+)|)$/
const ALIAS = {
  '--link': '--builtin=link',
}
const optionRe = /^--.+$/
const validOption = {
  '--dry-run': true,
  '--devtools': true,
  '--print-release': true,
  '--builtin=[cmd_name]': true,
  '--link': true,
  '--release=[release_type]': true,
  '--release': true,
  // Only for monorepo
  '--check-dependencies': true,
  '--fix-dependencies': true,
}

export function parseArgs(allArgs) {
  let cmd
  let builtin
  const cmdArgs = []
  const args = allArgs.slice()
  // nodeExecutable
  args.shift()
  // script
  args.shift()

  for (let arg of args) {
    const isBuiltin = builtinRe.exec(ALIAS[arg] || arg)
    const isRelease = releaseRe.exec(arg)
    const isOpt = optionRe.exec(arg)
    if (arg === '--check-dependencies' || arg === '--fix-dependencies') {
      builtin = builtinSignals['checkDependencies']
      cmdArgs.push(arg)
    } else if (isRelease) {
      const type = isRelease[2]
      const signal = `${type || 'default'}Release`
      builtin = builtinSignals[signal]
      if (!builtin) {
        throw new Error(
          `Invalid option '${arg}' (unknown builtin signal '${signal}').`
        )
      }
      cmdArgs.push(arg)
    } else if (isBuiltin) {
      const signal = isBuiltin[1]
      builtin = builtinSignals[signal]
      if (!builtin) {
        throw new Error(
          `Invalid option '${arg}' (unknown builtin signal '${signal}').`
        )
      }
      cmdArgs.push(arg)
    } else if (isOpt) {
      // option
      if (!validOption[arg]) {
        throw new Error(
          `Invalid option '${arg}'. Known options are (${Object.keys(
            validOption
          ).join(', ')}).`
        )
      }
      cmdArgs.push(arg)
    } else if (!cmd) {
      cmd = arg
    } else {
      cmdArgs.push(arg)
    }
  }
  return { cmd, args: cmdArgs, builtin }
}
