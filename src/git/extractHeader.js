const headerRe = /^(\w+)(?:\((.+)\))?:\s*(.+)$/
/* type(scope): message
 * type: message
 */
export function extractHeader(header) {
  const match = headerRe.exec(header)
  if (!match) {
    // non-standard commit message. BAD
    return {
      type: undefined,
      scope: undefined,
      message: header,
    }
  }
  return {
    type: match[1],
    scope: match[2],
    message: match[3].trim(),
  }
}
