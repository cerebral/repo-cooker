import FunctionTree from 'function-tree'
import { createConfig } from '../helpers/createConfig'
import { parseArgs } from '../helpers/parseArgs'

function provide(path, config) {
  // Lazy loading of providers to avoid requiring `nodegit` or other
  // big libraries if they are not needed.
  const provider = require(path).default
  return provider(config)
}

const PROVIDER = {
  git: './providers/GitProvider',
  github: './providers/GithubProvider',
  npm: './providers/NpmProvider',
  packageJson: './providers/PackageJsonProvider',
}
const USE_ALL = Object.assign(
  {},
  ...Object.keys(PROVIDER).map(k => ({ [k]: true }))
)

export function Cooker(argv, theOptions) {
  if (arguments.length !== 2) {
    theOptions = argv
    argv = []
  }
  const { cmd, args, builtin } = parseArgs(argv)
  const options = Object.assign({}, theOptions)
  if (args.includes('--dry-run')) {
    options.dryRun = true
    options.useDevtools = true
  }
  if (args.includes('--devtools')) {
    options.useDevtools = true
  }
  const config = createConfig(options)
  const use = builtin ? builtin.use : options.use || USE_ALL
  const ft = new FunctionTree(
    Object.assign(
      { config },
      ...Object.keys(use)
        .filter(k => use[k])
        .map(k => ({ [k]: provide(PROVIDER[k], config) })),
      options.providers || {}
    )
  )

  if (options.useDevtools) {
    const Devtools = require('function-tree/devtools').default
    const tools = new Devtools({
      host: options.devtools ? options.devtools.host : 'localhost:9090',
    })

    tools.add(ft)
  }
  ft.cook = (name, ...args) => {
    args.forEach(arg => {
      if (typeof arg === 'object') {
        arg.config = config
      }
    })
    return ft.run(name, ...args).catch(err => {
      console.log('')
      console.log(err.payload.error.message)
      console.log(err.payload.error.stack)
      if (options.devtools) {
        // Keep it running
      } else {
        const displayName = typeof name === 'string' ? `${name}: ` : ''
        console.log(`\n\x1b[31m** ${displayName}execution FAILED **\x1b[0m`)
        process.exit(-1)
      }
    })
  }

  if (builtin) {
    ft.cook(`run ${cmd}`, builtin.signal, { argv, cmd })
  }
  return ft
}
