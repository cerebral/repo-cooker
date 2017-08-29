import globby from 'globby'
import { resolve, sep } from 'path'
import { readFileSync } from 'fs'

export function getPackagesPaths(cwd, glob) {
  if (!glob) {
    // single repo
    const packageName = JSON.parse(
      readFileSync(resolve(cwd, 'package.json'), 'utf8')
    ).name
    return { [packageName]: resolve(cwd) }
  } else {
    return globby
      .sync(typeof glob === 'string' ? [glob] : glob, { cwd })
      .reduce((packagesMap, path) => {
        const pathArray = path.split(sep)
        const packageName = pathArray.pop()
        const dir = pathArray.pop()

        // If package starts with scoped dir, use that as part of name
        packagesMap[
          dir[0] === '@' ? dir + sep + packageName : packageName
        ] = resolve(cwd, path)

        return packagesMap
      }, {})
  }
}
