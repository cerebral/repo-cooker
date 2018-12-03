let parallelAllowed = true

export function setParallelAllowed(allowed) {
  parallelAllowed = allowed
  console.log(`PARALLEL: ${allowed ? 'ON' : 'OFF'}`)
}

export function runAll(tasks) {
  if (parallelAllowed) {
    return Promise.all(tasks)
  } else {
    return tasks.reduce((previous, task) => {
      return previous.then(all =>
        task.then(result => {
          return [...all, result]
        })
      )
    }, Promise.resolve([]))
  }
}
