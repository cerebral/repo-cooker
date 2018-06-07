import assert from 'assert'

export function equal(actual, expected, done) {
  if (done) {
    try {
      assert.equal(actual, expected)
      done()
    } catch (err) {
      done(err)
    }
  } else {
    assert.equal(actual, expected)
  }
}

export function deepEqual(actual, expected, done) {
  equal(
    JSON.stringify(actual, null, 2),
    JSON.stringify(expected, null, 2),
    done
  )
}

export function match(actual, regex, done) {
  let test = regex
  if (typeof test === 'string') {
    test = RegExp(test)
  }
  if (test.exec(actual)) {
    done()
  } else {
    equal(actual, `match /${regex}/`, done)
  }
}

export default { equal, deepEqual, match }
