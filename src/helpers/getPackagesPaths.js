import globby from 'globby'
import { join, sep } from 'path'

export function getPackagesPaths(cwd, glob = []) {
  return globby
    .sync(typeof glob === 'string' ? [glob] : glob, { cwd })
    .reduce((packagesMap, path) => {
      const pathArray = path.split(sep)
      const packageName = pathArray.pop()
      const dir = pathArray.pop()

      // If package starts with scoped dir, use that as part of name
      packagesMap[
        dir[0] === '@' ? dir + sep + packageName : packageName
      ] = join(cwd, path)

      return packagesMap
    }, {})
}
