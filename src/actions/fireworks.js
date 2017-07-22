import { execCommand } from '../helpers/execCommand'

export function fireworks({ config }) {
  const isReal = config.runCommand === execCommand
  const msg = isReal ? 'SUCCESS !!' : 'DRY RUN OK'
  const color = isReal ? '\x1b[32m' : '\x1b[36m'

  console.log(`\n${color}****************\x1b[0m`)
  console.log(`${color}**            **\x1b[0m`)
  console.log(`${color}** ${msg} **\x1b[0m`)
  console.log(`${color}**            **\x1b[0m`)
  console.log(`${color}****************\x1b[0m`)
}
