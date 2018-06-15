export function remap(propKey, callback) {
  return function remap(ctx) {
    const base = ctx.props[propKey]
    return {
      [propKey]: Object.assign(
        {},
        ...Object.keys(base).map(key => ({
          [key]: callback(key, base[key], ctx),
        }))
      ),
    }
  }
}
