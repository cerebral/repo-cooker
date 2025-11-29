import { readFileSync, writeFileSync } from 'fs'

export function forwardGraph(dependencies, names, seen = {}) {
  names.forEach((name) => {
    if (!seen[name]) {
      seen[name] = true
      forwardGraph(dependencies, dependencies[name] || [], seen)
    }
  })
  return seen
}

export function backwardGraph(dependencies, names, seen = {}) {
  names.forEach((name) => {
    if (!seen[name]) {
      seen[name] = true
      const dependent = Object.keys(dependencies).filter((packageName) =>
        // Packages that depend on 'name'
        dependencies[packageName].includes(name)
      )
      backwardGraph(dependencies, dependent, seen)
    }
  })
  return seen
}

// We use this helper so that we can mock during testing.
export const fs = {
  readFileSync(...args) {
    return readFileSync(...args)
  },
  writeFileSync(...args) {
    return writeFileSync(...args)
  },
}
