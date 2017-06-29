import FunctionTree from 'function-tree'
import { NpmProvider } from './providers/NpmProvider'
import { GitProvider } from './providers/GitProvider'

const ft = new FunctionTree([NpmProvider, GitProvider])

if (process.env.NODE_ENV !== 'production') {
  const Devtools = require('function-tree/devtools').default
  const devtools = new Devtools({
    host: 'localhost:9090',
  })

  devtools.add(ft)
}

export const run = ft.run
