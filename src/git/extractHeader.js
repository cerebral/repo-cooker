const headerRe = /^(\w+)(?:\((.+)\))?: (.+)$/
/* type(scope): message
 * type: message
 */
export function extractHeader(header) {
  const match = headerRe.exec(header)
  return {
    type: match[1],
    scope: match[2],
    message: match[3].trim(),
  }
}
