import { join as nativeJoin, resolve as nativeResolve, sep } from 'path'

export function resolve(...args) {
  if (sep === '/') {
    return nativeResolve(...args)
  }
  return nativeResolve(...args)
    .split(sep)
    .join('/')
}

export function join(...args) {
  if (sep === '/') {
    return nativeJoin(...args)
  }
  return nativeJoin(...args)
    .split(sep)
    .join('/')
}
