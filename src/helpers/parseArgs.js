import { builtinSequences } from '../sequences'

const builtinRe = /^--builtin=(.+)$/
const releaseRe = /^--release(=(.+)|)$/
const ALIAS = {
  '--link': '--builtin=link',
  '--link-bin': '--builtin=linkBin',
  '--build': '--builtin=build',
}
const optionRe = /^--.+$/
const validOption = {
  '--dry-run': true,
  '--devtools': true,
  '--builtin=[cmd_name]': true,
  '--build': true,
  '--link': true,
  '--link-bin': true,
  '--print-release': true,
  '--release=[release_type]': true,
  '--release': true,
  '--no-parallel': true,
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

  for (const arg of args) {
    const isBuiltin = builtinRe.exec(ALIAS[arg] || arg)
    const isRelease = releaseRe.exec(arg)
    const isOpt = optionRe.exec(arg)
    if (arg === '--check-dependencies' || arg === '--fix-dependencies') {
      builtin = builtinSequences.checkDependencies
      cmdArgs.push(arg)
    } else if (isRelease) {
      const type = isRelease[2]
      const sequence = `${type || 'default'}Release`
      builtin = builtinSequences[sequence]
      if (!builtin) {
        throw new Error(
          `Invalid option '${arg}' (unknown builtin sequence '${sequence}').`
        )
      }
      cmdArgs.push(arg)
    } else if (isBuiltin) {
      const sequence = isBuiltin[1]
      builtin = builtinSequences[sequence]
      if (!builtin) {
        throw new Error(
          `Invalid option '${arg}' (unknown builtin sequence '${sequence}').`
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
