// mirror of site/lib/evidence-identity.ts in natew/orez. the docs site still
// deploys from orez until it moves here; keep both copies identical.
export type EvidenceIdentity = 'verified-release' | 'verified-build' | 'unverified'

export function classifyEvidenceIdentity(
  status: string,
  releaseSha: string | null,
  buildSha: string | null
): EvidenceIdentity {
  if (status === 'verified' && releaseSha !== null && releaseSha === buildSha) {
    return 'verified-release'
  }
  if (status === 'verified' && buildSha !== null) return 'verified-build'
  return 'unverified'
}
