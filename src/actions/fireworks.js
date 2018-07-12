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

export function fireworksWithTitle(titleOrTag) {
  return function fireWorksWithtitle({ config, resolve }) {
    const title = resolve.value(titleOrTag)
    const isReal = config.runCommand === execCommand
    const msg = isReal ? 'SUCCESS !!' : 'DRY RUN OK'
    const color = isReal ? '\x1b[32m' : '\x1b[36m'

    const titleSpace = title.replace(/./g, ' ')
    const titleStar = title.replace(/./g, '*')
    console.log(
      [
        `\n${color}*${titleStar}*****************\x1b[0m`,
        `${color}** ${titleSpace}             **\x1b[0m`,
        `${color}** ${title}: ${msg} **\x1b[0m`,
        `${color}** ${titleSpace}             **\x1b[0m`,
        `${color}***${titleStar}***************\x1b[0m`,
      ].join('\n')
    )
  }
}
