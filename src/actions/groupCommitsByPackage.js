import { resolve } from '../helpers/path'

let commitsWithoutPackage = []

/*
  By looking at files changed we can match the name of
  the package
*/
function matchPackage(filePath, config) {
  for (let packageName in config.packagesPaths) {
    if (
      resolve(config.path, filePath).indexOf(
        config.packagesPaths[packageName] + '/'
      ) === 0
    ) {
      return packageName
    }
  }

  // Not in any package
  return 'monorepo'
}

/*
  Returns:
  {
    commitsByPackage: {
      packageA: [{commitA}, {commitB}],
      packageB: [{commitA}, {commitC}]
    }
  }
*/
export function groupCommitsByPackage({ config, props }) {
  return {
    /*
      By looking at file paths change we can identify what packages
      are affected by this change
    */
    commitsByPackage: props.commits.reduce((commitsByPackage, commit) => {
      /*
        Extract packages affected by matching file path changed with
        defined packages in config
      */
      const packagesAffected = commit.files
        .reduce((packagesAffected, file) => {
          const packageName = matchPackage(file, config)
          if (packageName && packagesAffected.indexOf(packageName) === -1) {
            return packagesAffected.concat(packageName)
          }

          return packagesAffected
        }, [])
        /*
          Exclude monorepo when commit affects other packages
        */
        .filter((packageName, _, array) => {
          if (packageName === 'monorepo' && array.length > 1) {
            return false
          }

          return true
        })

      /*
        Put commit into each package array
      */
      packagesAffected.forEach(packageName => {
        if (!commitsByPackage[packageName]) {
          commitsByPackage[packageName] = []
        }

        commitsByPackage[packageName].push(commit)
      })

      /*
        Move commits not related to any package to commitsWithoutPackage
      */
      if (commitsByPackage.monorepo) {
        commitsByPackage.monorepo.forEach(commitWithoutPackage => {
          commitsWithoutPackage.push(commitWithoutPackage)
        })
      }
      delete commitsByPackage['monorepo']

      return commitsByPackage
    }, {}),
    commitsWithoutPackage,
  }
}
