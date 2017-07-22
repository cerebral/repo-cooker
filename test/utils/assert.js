import assert from 'assert'

export function equal(actual, expected, done) {
  try {
    assert.equal(actual, expected)
    done()
  } catch (err) {
    done(err)
  }
}

export function deepEqual(actual, expected, done) {
  equal(
    JSON.stringify(actual, null, 2),
    JSON.stringify(expected, null, 2),
    done
  )
}

export default { equal, deepEqual }
