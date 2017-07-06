import FunctionTree from 'function-tree'
import { NpmProvider } from './providers/NpmProvider'
import { GitProvider } from './providers/GitProvider'

export function Cooker({ devtools, path = '.', providers = [] }) {
  const ft = new FunctionTree(
    [NpmProvider({ path }), GitProvider({ path })].concat(providers)
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
