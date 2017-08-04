export function remap(propKey, callback) {
  return function remap({ props }) {
    const base = props[propKey]
    return {
      [propKey]: Object.assign(
        {},
        ...Object.keys(base).map(key => ({
          [key]: callback(base[key], props, key),
        }))
      ),
    }
  }
}
