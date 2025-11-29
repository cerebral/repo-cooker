import { runAll } from '../helpers/runAll'

export function remap(propKey, callback) {
  return function remap(ctx) {
    const base = ctx.props[propKey]
    return runAll(
      Object.keys(base).map((key) => {
        const value = callback(key, base[key], ctx)
        if (value instanceof Promise) {
          return value.then((v) => ({ [key]: v }))
        } else {
          return Promise.resolve({ [key]: value })
        }
      })
    )
      .then((results) => Object.assign({}, ...results))
      .then((newProp) => ({ [propKey]: newProp }))
  }
}
