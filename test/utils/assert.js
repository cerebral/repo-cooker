import assert from 'assert'

export function equal(a, b, done) {
  try {
    assert.equal(a, b)
    done()
  } catch (err) {
    done(err)
  }
}

export function deepEqual(a, b, done) {
  try {
    assert.equal(JSON.stringify(a, null, 2), JSON.stringify(b, null, 2))
    done()
  } catch (err) {
    console.log(JSON.stringify(a, null, 2))
    done(err)
  }
}

export default { equal, deepEqual }
