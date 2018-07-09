import globby from 'globby'
import { readFileSync } from 'fs'
import { resolve } from '../helpers/path'

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
      .sort()
      .reduce((packagesMap, path) => {
        const pathArray = path.split('/')
        const packageName = pathArray.pop()
        const dir = pathArray.pop()

        // If package starts with scoped dir, use that as part of name
        packagesMap[
          dir[0] === '@' ? dir + '/' + packageName : packageName
        ] = resolve(cwd, path)

        return packagesMap
      }, {})
  }
}
