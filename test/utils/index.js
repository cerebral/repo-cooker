import { resolve, join } from 'path'
import { createConfig } from '../../src/helpers/createConfig'

export { execCli } from './execCli'
export { testAction } from './testAction'
export { testActionThrows } from './testActionThrows'
export { runCommandMock } from './runCommandMock'

const path = resolve(join(__dirname, '..', 'repo'))

export const options = {
  path,
  devtools: null,
  packagesGlobs: [
    'packages/node_modules/*',
    'packages/node_modules/@repo-cooker-test/*',
    '!packages/node_modules/@repo-cooker-test',
  ],
}

export const config = createConfig(options)
