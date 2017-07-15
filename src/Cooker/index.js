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

  return ft
}
