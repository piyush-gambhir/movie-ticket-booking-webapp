# Node 26 upgrade verification

Reviewed on 26 October 2026 against `origin/release` at `b489585`.

## Runtime and dependency compatibility

The queued work was rebased onto the latest upstream security fixes. The bounded Drizzle legacy-loader removal, offline schema-generation regression suite, strict validation gates, Next.js security release, and retirement of the obsolete Bun lockfile are preserved.

Node 26.12.1 is pinned in the existing `.nvmrc` and container. Node 24.22.1 remains supported for Vercel hosting, and CI checks both versions. The manual Vercel workflow retains Node 24; only its pnpm version is aligned with 12.15.0. pnpm and the supported lockfile remain the installation path.

This repository is JavaScript/JSX with no TypeScript checker, so no unused TypeScript compiler packages or scripts were introduced. Direct dependencies were checked against current registry versions. ESLint 9.39.5 remains for the React plugin peer range; the existing NextAuth 5 beta is preserved rather than downgraded to the stable 4.x channel.

## Verification

On Node 24.22.1 and 26.12.1:

- ESLint passes with zero errors and 15 existing warnings. No new lint suppression or application source cleanup was added.
- All three existing Drizzle security regression tests pass, including offline SQL/schema generation. No database migration, push or seed command was run against an actual database.
- The existing synthetic `build:ci` production build passes with placeholder credentials.

Frozen installation and peer checks pass. Full and production dependency audits report zero known advisories. The upstream zero-advisory baseline is preserved; this is not a full application security audit.

Isolated Chromium 155 checks pass against the production build:

- Sign-in validation renders its invalid-email error.
- A localhost read-only catalog fixture renders the homepage and movie detail page, and the Book Tickets button navigates to the fixture movie.
- Anonymous seat-selection access redirects to sign-in.
- A locally signed disposable session and read-only user fixture allow testing seat selection. Premium and normal selections update totals from 0 to 300 to 560 to 260, including deselection.
- No browser page errors occur. External browser requests, including analytics, are blocked.

These fixtures verify UI/runtime behavior, not live PostgreSQL, Typesense, TMDB, credential sign-in, OAuth, email delivery, reservation or payment success. No real account or paid booking was created. The existing README already identifies payment and reservation completion as unfinished features.

## Container verification

The previous Dockerfile copied `.next/standalone`, but Next did not emit it. The configuration now enables standalone output. The Node 26 container explicitly installs pnpm, allows its required install script, and uses frozen dependency installation. Build-only synthetic values satisfy import-time environment validation without copying credential files. `.dockerignore` excludes environment files and local dependency/build directories.

The public application URL is a build argument. For example:

```sh
docker build --build-arg NEXT_PUBLIC_APP_URL=https://your-app.example -t movie-app:review .
```

Supply real runtime configuration through the deployment environment, not the build context. The public URL is bundled into the client, so it must match the deployed origin.

The Linux/arm64 image builds successfully. Runtime inspection confirms Node 26.12.1, UID 1001, the standalone server, and no root-level environment credential files. The image also serves the sign-in form and client-side validation with a read-only root filesystem and writable temporary/cache mounts. Only local dummy runtime configuration was supplied. amd64 execution was not checked in this pass.

## Release boundary and gains

CI runs on release branch pushes and pull requests. Deployment remains manual-only and was not invoked. A separately configured hosting Git integration may react to a future push; that external configuration was not inspected.

No push, PR, tag, release, deployment, provider setup, production database operation, or global configuration change was performed. Browser profiles and fixture data were disposable. The demonstrated gains are compatible dependency updates, verified dual-runtime support, and a working reproducible container packaging path. No controlled performance benchmark was run, so no runtime speedup is claimed.
