import { mkdirSync, statSync } from 'fs'
import { join, resolve } from 'path'
import { spawn } from 'cross-spawn'
import symlinkDir from 'symlink-dir'

const REPO_PATH = './test/repo'
const REPO_URL = 'https://github.com/cerebral/repo-cooker-test.git'
const SPAWN_OPTS = { stdio: 'inherit' }

function ensureLink() {
  mkdirSync(join(REPO_PATH, 'node_modules'), { recursive: true })
  const distPath = resolve('dist') // absolute path to top-level dist
  return symlinkDir(distPath, join(REPO_PATH, 'node_modules', 'repo-cooker'))
}

try {
  statSync(REPO_PATH)
  // repo exists — ensure symlink exists (in case CI reused workspace)
  ensureLink().catch((err) => {
    console.error('Failed to symlink dist into test repo:', err)
    process.exit(1)
  })
} catch (_err) {
  const clone = spawn('git', ['clone', REPO_URL, REPO_PATH], SPAWN_OPTS)
  clone.on('close', async (code) => {
    if (code === 0) {
      try {
        await ensureLink()
      } catch (err) {
        console.error('Failed to symlink dist into test repo after clone:', err)
        process.exit(1)
      }
    } else {
      console.error('git clone failed with code', code)
      process.exit(code)
    }
  })
}
