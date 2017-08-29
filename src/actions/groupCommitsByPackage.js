import { resolve, sep } from 'path'

/*
  By looking at files changed we can match the name of
  the package
*/
function matchPackage(filePath, config) {
  for (let packageName in config.packagesPaths) {
    if (
      resolve(config.path, filePath).indexOf(
        config.packagesPaths[packageName] + sep
      ) === 0
    ) {
      return packageName
    }
  }

  return null
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
      const packagesAffected = commit.files.reduce((packagesAffected, file) => {
        const packageName = matchPackage(file, config)
        if (packageName && packagesAffected.indexOf(packageName) === -1) {
          return packagesAffected.concat(packageName)
        }

        return packagesAffected
      }, [])

      /*
        Put commit into each package array
      */
      packagesAffected.forEach(packageName => {
        if (!commitsByPackage[packageName]) {
          commitsByPackage[packageName] = []
        }

        commitsByPackage[packageName].push(commit)
      })

      return commitsByPackage
    }, {}),
  }
}
