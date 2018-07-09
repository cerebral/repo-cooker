import { mkdirSync, statSync } from 'fs'

import { join } from 'path'
import { spawn } from 'cross-spawn'
import symlinkDir from 'symlink-dir'

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
      symlinkDir('src', join(REPO_PATH, 'node_modules', 'repo-cooker'))
    }
  })
}
