export function runNpmScriptByRelatedPackage(scriptNameTag, args = []) {
  return function numNpmScriptByRelatedPackage({ props, npm, resolve }) {
    const scriptName = resolve.value(scriptNameTag)
    const related = props.relatedPackagesByPackage

    const completed = {}
    function taskReady(todo) {
      if (!todo.length) {
        return Promise.resolve([])
      }

      const ready = todo.filter(
        name =>
          related[name].filter(n => completed[n] === undefined).length === 0
      )

      if (!ready.length) {
        return Promise.reject(
          new Error(
            `Cannot run script on packages: there is a dependency cycle between packages ${JSON.stringify(
              related
            )}.`
          )
        )
      }

      return Promise.all(
        ready.map(name => npm.runScript(name, scriptName, args))
      ).then(results => {
        ready.forEach((name, idx) => (completed[name] = results[idx]))

        return taskReady(todo.filter(n => completed[n] === undefined)).then(
          res => completed
        )
      })
    }

    return taskReady(Object.keys(related)).then(completed => {
      const failures = Object.keys(completed).find(
        pack => completed[pack] && !completed[pack].pass
      )
      if (failures) {
        throw new Error(`running npm scripts '${scriptName}' failed.`)
      }

      return {
        [`${scriptName}NpmScript`]: completed,
      }
    })
  }
}
