const headerRe = /^(\w+)(?:\((.+)\))?:\s*(.+)$/
/* type(scope): message
 * type: message
 */
export function parseHeader(header) {
  const match = headerRe.exec(header)
  if (!match) {
    // non-standard commit message. BAD
    return {
      type: undefined,
      scope: undefined,
      summary: header,
    }
  }
  return {
    type: match[1],
    scope: match[2],
    summary: match[3].trim(),
  }
}
