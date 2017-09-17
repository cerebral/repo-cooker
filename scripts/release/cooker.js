import { Cooker } from 'repo-cooker'

const dryRun =
  process.argv[2] !== '--publish' && process.argv[3] !== '--publish'
const debug = process.argv[2] === '--debug' || process.argv[3] === '--debug'

process.env.REPO_COOKER_GITHUB_TOKEN = process.env.GH_TOKEN

export const cooker = Cooker({
  devtools: null,
  path: '.',
  dryRun,
  debug,
})
