import { resolve, join } from 'path'
export { testAction } from './testAction'
export { testActionThrows } from './testActionThrows'
export { runCommandMock } from './runCommandMock'

const path = resolve(join(__dirname, '..', 'repo'))

export const config = {
  path,
  devtools: null,
  packagesPath: 'packages/node_modules',
}
