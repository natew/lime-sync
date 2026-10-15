# Releasing Lime Sync

Every ordinary push to `main` publishes a canary after the full `CI` workflow
passes. `.github/workflows/release-sync-native.yml` first verifies the native
source and publishes any required native update. When that top-level workflow
succeeds, `.github/workflows/release.yml` checks out its exact source commit and
publishes every public workspace package with npm trusted publishing. Canary
versions use the current stable version plus `-canary.<timestamp>` and the npm
`canary` dist-tag.

An accepted npm upload can remain in processing after `npm publish` exits
successfully. Before reporting success, the release script verifies every exact
version in the public registry's install index, the canary tag for canaries,
and the downloaded tarball's checksum. It checks only unavailable packages
for up to fifteen minutes, bypassing cached misses. Missing versions, tags,
or tarballs fail the run; stable commits and tags are created only after this
verification passes.

Canary publishing does not edit manifests, create a release commit or tag, or
push back to `main`. Stable release commits, whose subject matches the checked-in
`v<version>`, are skipped instead of producing a canary of the same version.

## npm trusted publishers

Configure the same GitHub Actions trusted publisher for each public package:

- `lime-sync`
- `bedrock-sqlite`
- `lime-sync-executor`
- `lime-sync-cf-host`
- `lime-sync-native` plus every `lime-sync-native-*` platform package

Use these settings in each package's npm **Settings → Trusted publishing** page:

- Organization or user: `natew`
- Repository: `lime-sync`
- Workflow filename: `release.yml` (or `release-sync-native.yml` for the
  native launcher and platform packages)
- Environment name: leave blank
- Allowed actions: `npm publish`

The release workflows deliberately have no npm token. GitHub issues a short-lived
OIDC identity for the publish job, and npm exchanges it for package-specific
publish access. The workflows use npm 12.0.1, Node 24, and GitHub-hosted runners.

Configure all packages before `release.yml` reaches `main`. A package
without the trusted publisher will reject its publish after earlier packages may
already have been published.

New native package names are bootstrapped from a clean, current `main` checkout
after hosted CI passes:

```sh
bun run release:native:bootstrap
```

The command claims any missing native names at `0.0.0-bootstrap.0` under the
`bootstrap` tag, then configures the `natew/lime-sync` /
`release-sync-native.yml` trusted publisher. Reruns verify and skip completed
names. Bootstrapping is a release action and requires explicit approval.

## Stable releases

Stable releases remain explicit. From a clean, current `main` checkout, dispatch
one with:

```sh
bun release --patch --ci
```

The local command verifies the checkout, dispatches `release-sync-native.yml`,
prints the run URL, and exits. GitHub then owns the full release under OIDC. The
native workflow publishes a new native package version when the durable
contract or native source changed, then dispatches `release.yml` itself. That
second top-level workflow publishes the public workspace family and finally
creates and pushes
the stable version commit and tag. Keeping both as top-level workflows matters:
npm validates the workflow filename registered for each package's trusted
publisher. No local npm login or second release command is involved.

The workflow also accepts `minor` and `major` dispatch inputs. If npm stops
after publishing only part of the package family, rerun the same dispatch. The
release script checks npm before every publish and skips versions that already
reached the registry.

Stable publishing still requires an explicit dispatch; ordinary main pushes
publish the native prerequisite when needed and the workspace canary family.

## Local consumer validation

To exercise the current source in the sibling Orez checkout (whose `on-zero`
package consumes `lime-sync` from npm), run:

```sh
bun release --into ~/orez
```

The command builds and installs the current source without publishing to npm.
It replaces ordinary packages only when their installed versions match the
source checkout. Native packages are the exception because their checked-in
version is a template and CI may have allocated a newer published version. If
the consumer has native `0.1.7` while this source template says `0.1.6`, the
local flow builds the current native binary as `0.1.8` and updates the staged
dependency to that local version. Do not copy `dist` files or install a
different transport artifact to work around this mismatch. An ordinary package
version mismatch means the consumer and source checkout are not the same
release line; use a matching checkout before rerunning `--into`.
