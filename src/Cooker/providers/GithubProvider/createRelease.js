import { join } from 'path'
import request from 'request'

import { readFile } from 'fs'
const REPO_URL_RE = /^.*:\/\/([^/]+)\/([^/]+)\/([^.]+)/

function getRepositoryInfo(path) {
  return new Promise((resolve, reject) => {
    const packageJsonPath = join(path, 'package.json')
    readFile(packageJsonPath, (err, data) => {
      if (err) {
        reject(new Error(`Could not read '${packageJsonPath}' (${err}).`))
      }
      resolve(JSON.parse(data))
    })
  }).then(details => {
    const { repository } = details
    if (!repository) {
      throw new Error(
        `Cannot find repository url: missing 'repository' entry in package.json.`
      )
    }
    const { url } = repository
    if (!url) {
      throw new Error(
        `Cannot find repository url: missing 'url' entry in 'repository' in package.json.`
      )
    }
    const match = REPO_URL_RE.exec(url)
    if (!match) {
      throw new Error(`Could not parse repository url '${url}'.`)
    }
    return { domain: match[1], owner: match[2], repo: match[3] }
  })
}

export function createRelease(path, tagName, body) {
  // POST /repos/:owner/:repo/releases
  const requestBody = JSON.stringify({
    tag_name: tagName,
    name: tagName,
    body,
    draft: false,
    prerelease: false,
  })

  const headers = {
    'User-Agent': 'repo-cooker',
    Authorization: `token ${process.env.REPO_COOKER_GITHUB_TOKEN}`,
    'Content-Type': 'application/json; charset=utf-8',
  }

  return new Promise((resolve, reject) => {
    getRepositoryInfo(path)
      .then(({ domain, owner, repo }) => {
        if (domain !== 'github.com') {
          reject(
            new Error(
              `Release to domain '${domain}' is not supported (please use 'github.com').`
            )
          )
        }
        const url = `https://api.${domain}/repos/${owner}/${repo}/releases`
        return request.post(
          { url, headers, body: requestBody },
          (err, response, body) => {
            if (err) {
              reject(new Error(err))
            } else if (response.statusCode === 201) {
              resolve(JSON.parse(body))
            } else {
              reject(new Error(body))
            }
          }
        )
      })
      .catch(reject)
  })
}
