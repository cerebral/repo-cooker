export function filter(propKey, callback) {
  return function filter(ctx) {
    const base = ctx.props[propKey]
    return Promise.all(
      Object.keys(base).map(key => {
        const keepIt = callback(key, base[key], ctx)
        if (keepIt instanceof Promise) {
          return keepIt.then(keep => ({ key, keep }))
        } else {
          return Promise.resolve({ key, keep: keepIt })
        }
      })
    )
      .then(results =>
        results.filter(r => r.keep).map(r => ({ [r.key]: base[r.key] }))
      )
      .then(results => Object.assign({}, ...results))
      .then(newProp => ({ [propKey]: newProp }))
  }
}
