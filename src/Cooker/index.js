import FunctionTree from 'function-tree'
import { NpmProvider } from './providers/NpmProvider'
import { GitProvider } from './providers/GitProvider'

export function Cooker({ devtools, git, npm }) {
  const ft = new FunctionTree([NpmProvider(npm), GitProvider(git)])

  if (devtools !== null && process.env.NODE_ENV !== 'production') {
    const Devtools = require('function-tree/devtools').default
    const devtools = new Devtools({
      host: devtools ? devtools.host : 'localhost:9090',
    })

    devtools.add(ft)
  }
  return { run: ft.run, functionTree: ft }
}
