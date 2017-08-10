import { Cooker } from 'repo-cooker'

const dryRun = process.argv[2] !== '--publish'

process.env.REPO_COOKER_GITHUB_TOKEN = process.env.GH_TOKEN

export const cooker = Cooker({
  devtools: null,
  path: '.',
  dryRun,
})
