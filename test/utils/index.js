import { createConfig } from '../../src/helpers/createConfig'
import { resolve } from '../../src/helpers/path'

export { execCli } from './execCli'
export { testAction } from './testAction'
export { testActionThrows } from './testActionThrows'
export { runCommandMock } from './runCommandMock'

const path = resolve(__dirname, '..', 'repo')

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
