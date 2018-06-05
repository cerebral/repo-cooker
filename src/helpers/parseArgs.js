const optionRe = /^--.+$/
const validOption = {
  '--dry-run': true,
  '--devtools': true,
  '--run': true,
}

export function parseArgs(allArgs) {
  let cmd = undefined
  const cmdArgs = []
  const args = allArgs.slice()
  const nodeExecutable = args.shift()
  const script = args.shift()

  for (let arg of args) {
    const isOpt = optionRe.exec(arg)
    if (isOpt) {
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
  return { cmd, args: cmdArgs }
}
