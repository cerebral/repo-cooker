import * as fs from 'fs'

import { listTags, readTag, resolveRef } from 'isomorphic-git'

export async function getLatestTagMatchingName(repoPath, regex) {
  if (typeof regex === 'string') {
    regex = RegExp(regex)
  }
  const tagName = (await listTags({ fs, dir: repoPath }))
    .sort((a, b) => (a > b ? -1 : 1))
    .find(tagName => regex.test(tagName))
  if (!tagName) {
    return null
  }
  const hash = await resolveRef({
    fs,
    dir: repoPath,
    ref: `refs/tags/${tagName}`,
  })
  const tag = (await readTag({ fs, dir: repoPath, oid: hash })).tag

  return {
    tag: tagName,
    hash: tag.object,
    date: new Date(tag.tagger.timestamp * 1000).toISOString(),
  }
}
