import { join as nativeJoin, resolve as nativeResolve, sep } from 'path'

export function resolve(...args) {
  return nativeResolve(...args).replace(sep, '/')
}

export function join(...args) {
  return nativeJoin(...args).replace(sep, '/')
}
