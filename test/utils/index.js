export { testAction } from './testAction'
import { resolve, join } from 'path'

const path = resolve(join(__dirname, '..', 'repo'))

export const config = { git: { path }, npm: { path }, devtools: null }
