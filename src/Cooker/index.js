import FunctionTree from 'function-tree'
import { join } from 'path'
import { execCommand, logCommand } from './execCommand'
import { GithubProvider } from './providers/GithubProvider'
import { GitProvider } from './providers/GitProvider'
import { NpmProvider } from './providers/NpmProvider'
import { PackageJsonProvider } from './providers/PackageJsonProvider'

export function Cooker({
  devtools,
  path = '.',
  providers = [],
  dryRun,
  packagesPath,
}) {
  const runCommand =
    dryRun === true
      ? logCommand
      : typeof dryRun === 'function' ? dryRun : execCommand

  const getPackagePath = packagesPath
    ? packageName => join(path, packagesPath, packageName)
    : packageName => path
  const config = { path, getPackagePath, runCommand }

  const ft = new FunctionTree(
    [
      GitProvider(config),
      GithubProvider(config),
      NpmProvider(config),
      PackageJsonProvider(config),
    ].concat(providers)
  )

  if (devtools !== null && process.env.NODE_ENV !== 'production') {
    const Devtools = require('function-tree/devtools').default
    const tools = new Devtools({
      host: devtools ? devtools.host : 'localhost:9090',
    })

    tools.add(ft)
  }

  return ft
}
