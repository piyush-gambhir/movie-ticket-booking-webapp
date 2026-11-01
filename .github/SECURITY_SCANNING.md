# Dependency security

GHSA-gcqx-w48m-w2h4 affects deepmerge 4.2.0 through 4.3.1. There is no released upstream fix
as of 2026-10-29. The app includes it through html-to-text in both email-renderer routes.
The reported prototype inheritance is reproducible in the installed dependency. This is a
locally mitigated advisory, not a scanner false positive or a confirmed remote exploit in this app.

The version selector keeps affected releases on 4.3.1 with a checked-in pnpm patch. The patch
rejects `__proto__` keys in both copy loops, including the published CJS and UMD bundles. It
follows the behavior proposed in https://github.com/TehShrike/deepmerge/pull/274. The Docker
build copies the patch before installing dependencies.

The audit policy excludes only GHSA-gcqx-w48m-w2h4 because the locked artifact is patched.
The required Security checks gate depends on a job that installs the frozen lockfile, tests
the actual dependency resolved through both email-renderer routes, and runs the full audit.
The regression exercises null-prototype defaults, a null nested default, a target with an own
prototype key, and an array element, plus normal merges and email text rendering.

Use the committed pnpm workspace and lockfile: npm does not apply pnpm patches. Remove the
patch, version selector and audit exception together when an upstream fix is adopted. Other
audit advisories still fail CI.
