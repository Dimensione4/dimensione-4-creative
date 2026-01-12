# Dimensione 4 — Git Workflow (Branching & PR Policy)

## 1) Permanent branches (source of truth)

We maintain two permanent branches:

* **`main`** → Production

  * Live website: `https://dimensione4.it`
  * Always stable, always deployable.
* **`staging`** → Pre-production / QA

  * Staging website: `https://staging.dimensione4.it`
  * Used to test changes before production release.

---

## 2) Temporary branches (development work)

All development work must happen in temporary branches created from `staging`:

* `feature/<short-name>` → new features
  Examples:

  * `feature/threejs-logo`
  * `feature/hero-copy`
  * `feature/theme-toggle`

* `fix/<short-name>` → bug fixes
  Examples:

  * `fix/mobile-menu`
  * `fix/seo-meta-tags`

* `chore/<short-name>` → refactors, maintenance, tooling
  Examples:

  * `chore/deps-update`
  * `chore/lint-rules`

---

## 3) Branch creation rule

Create new branches from `staging` (not from `main`):

```bash
git checkout staging
git pull origin staging
git checkout -b feature/<name>
```

Reason: `staging` represents the integration baseline for upcoming releases.

---

## 4) Pull Request flow (mandatory)

### ✅ Standard flow

1. `feature/*` → PR → **`staging`**

   * staging deploy runs automatically
   * test on `staging.dimensione4.it`

2. `staging` → PR → **`main`**

   * production deploy runs automatically
   * release goes live on `dimensione4.it`

### ❌ Disallowed

* No direct merges from `feature/*` to `main`
* No direct pushes to `main` (except emergency hotfix)

---

## 5) PR quality checklist

Before merging into `staging`:

* [ ] build passes (GitHub Actions)
* [ ] tested on staging URL
* [ ] mobile responsive check (min. 360px)
* [ ] no console errors
* [ ] SEO: title/meta/canonical not broken
* [ ] no `.env` or secrets committed

Before merging `staging` → `main`:

* [ ] sanity check on staging URL
* [ ] no pending unfinished experimental changes
* [ ] Lighthouse quick check (Performance/SEO)

---

## 6) Commit message convention (recommended)

Use this convention:

* `feat: ...`
* `fix: ...`
* `chore: ...`
* `refactor: ...`
* `docs: ...`
* `test: ...`

Examples:

* `feat: add theme toggle`
* `fix: correct sitemap links`
* `chore: update dependencies`

---

## 7) Deployment mapping

Deploy is CI/CD-based and automatic:

* push/merge into **`staging`** → deploy to `staging.dimensione4.it`
* push/merge into **`main`** → deploy to `dimensione4.it`

---

## 8) Emergency hotfix procedure

If production is broken:

1. create branch from `main`

   ```bash
   git checkout main
   git pull
   git checkout -b fix/hotfix-<issue>
   ```

2. PR → `main` (merge ASAP)

3. immediately cherry-pick / merge hotfix into `staging` to keep branches aligned.

---

# Branch protections in GitHub

### Protect `main`

* ✅ Require pull request before merging
* ✅ Require status checks to pass
* ✅ Block force pushes
* ✅ Restrict deletions

### Protect `staging` (optional but recommended)

* ✅ Require status checks to pass