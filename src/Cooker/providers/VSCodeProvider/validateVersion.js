const SEMVER = /^[\d]+\.[\d]+\.[\d]+$/

export function validateVersion(version) {
  // Only publish semver versions (no "next" type of version)
  return SEMVER.test(version)
}
