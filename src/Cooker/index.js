import FunctionTree from 'function-tree'
import { join } from 'path'
import { execCommand, LogCommand } from './execCommand'
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
      ? LogCommand(path)
      : typeof dryRun === 'function' ? dryRun : execCommand

  const getPackagePath = packagesPath
    ? packageName => join(path, packagesPath, packageName)
    : packageName => path

  const ft = new FunctionTree(
    [
      GitProvider({ path }),
      NpmProvider({ runCommand, getPackagePath }),
      PackageJsonProvider({ runCommand, getPackagePath }),
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
