/**
 * Verify two checksums against each other
 *
 * @param expected Expected checksum value
 * @param actual Actual observed checksum value
 * @returns Whether the two checksums are equal
 */
export function verifyChecksum(expected: Buffer, actual: Buffer) {
  if (expected.length !== actual.length) {
    return false
  }
  if (expected.length === 0) {
    return true
  }
  for (let i = 0; i < expected.length; i += 1) {
    if (expected[i] !== actual[i]) {
      return false
    }
  }
  return true
}
