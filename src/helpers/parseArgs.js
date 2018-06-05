import { runSignalSetup } from '../signals/run'

const builtinRe = /^--builtin=(.+)$/
const optionRe = /^--.+$/
const validOption = {
  '--dry-run': true,
  '--devtools': true,
  '--builtin=[cmd_name]': true,
}

const BUILTIN_SIGNALS = {
  run: runSignalSetup,
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
    const isBuiltin = builtinRe.exec(arg)
    const isOpt = optionRe.exec(arg)
    if (isBuiltin) {
      const signal = isBuiltin[1]
      builtin = BUILTIN_SIGNALS[signal]
      if (!builtin) {
        throw new Error(
          `Invalid option '${arg}' (unknown builtin signal '${signal}').`
        )
      }
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
