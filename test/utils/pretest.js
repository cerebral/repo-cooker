import { spawn } from 'child_process'
import { mkdirSync, statSync, symlinkSync } from 'fs'
import { join } from 'path'

const REPO_PATH = './test/repo'
const REPO_URL = 'https://github.com/cerebral/repo-cooker-test.git'
const SPAWN_OPTS = { stdio: 'inherit' }

try {
  statSync(REPO_PATH)
  // Exists. All good.
} catch (err) {
  const clone = spawn('git', ['clone', REPO_URL, REPO_PATH], SPAWN_OPTS)
  clone.on('close', code => {
    if (code === 0) {
      mkdirSync(join(REPO_PATH, 'node_modules'))
      symlinkSync(
        '../../../src',
        join(REPO_PATH, 'node_modules', 'repo-cooker')
      )
    }
  })
}
