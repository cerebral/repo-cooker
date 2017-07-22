import FunctionTree from 'function-tree'
import { ConfigProvider } from './providers/ConfigProvider'
import { GithubProvider } from './providers/GithubProvider'
import { GitProvider } from './providers/GitProvider'
import { NpmProvider } from './providers/NpmProvider'
import { PackageJsonProvider } from './providers/PackageJsonProvider'
import { createConfig } from '../helpers/createConfig'

export function Cooker(options) {
  const config = createConfig(options)

  const ft = new FunctionTree(
    [
      ConfigProvider(config),
      GitProvider(config),
      GithubProvider(config),
      NpmProvider(config),
      PackageJsonProvider(config),
    ].concat(options.providers || [])
  )

  if (options.devtools !== null && process.env.NODE_ENV !== 'production') {
    const Devtools = require('function-tree/devtools').default
    const tools = new Devtools({
      host: options.devtools ? options.devtools.host : 'localhost:9090',
    })

    tools.add(ft)
  }
  ft.cook = (name, ...args) =>
    ft.run(name, ...args).catch(err => {
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

  return ft
}
