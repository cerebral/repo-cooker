import { resolve, join } from 'path'
export { testAction } from './testAction'
export { testActionThrows } from './testActionThrows'
export { DryRun } from './DryRun'

const path = resolve(join(__dirname, '..', 'repo'))

export const config = {
  path,
  devtools: null,
  packagesPath: 'packages/node_modules',
}
