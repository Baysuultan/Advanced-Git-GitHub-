# Advanced Git & GitHub — Variant A report

Student: Baisultan Student  
Date: 2026-10-02

## Task 1 — Emergency production hotfix

The production branch was `main`. I created `hotfix/payment-bug` from it, corrected the formula in `src/payment.js`, and committed the fix:

```text
d692ac6 Fix payment calculation error
```

The branch was merged into `main` by merge commit `5f79700` and synchronized with `develop`. Release tag `v1.0.1` points to the release state. The local checks passed:

```bash
npm test
npm run lint
```

Commands used:

```bash
git checkout main
git checkout -b hotfix/payment-bug
git add src/payment.js
git commit -m "Fix payment calculation error"
git checkout main
git merge --no-ff hotfix/payment-bug
git checkout develop
git merge main
git tag -a v1.0.1 -m "Release v1.0.1: payment hotfix"
```

The hotfix must start from `main`, because `main` represents the deployed production code. Starting from `develop` could include unfinished feature code and introduce unrelated changes into the emergency release.

## Task 2 — Complex merge conflict

Two branches changed `src/auth.config`:

- `feature/password-policy`: length 12 and required numbers;
- `feature/security-rules`: length 16 and required symbols.

Merging the second branch produced a real content conflict. It was resolved in commit `8ef7980 Resolve password policy conflict`. The final configuration keeps the stricter length and both security controls:

```ini
minimum_password_length = 16
require_numbers = true
require_symbols = true
```

Commands used:

```bash
git merge feature/password-policy
git merge feature/security-rules
git status
# edit src/auth.config and remove conflict markers
git add src/auth.config
git commit -m "Resolve password policy conflict"
```

## Task 3 — Git forensics

The investigation was performed in isolated branch `forensics/auth-history`. Automated `git bisect` identified the first bad commit:

| Field | Result |
| --- | --- |
| Bad commit | `5edd3fe` |
| Subject | `D Tighten authentication validation` |
| Author | Baisultan Student `<baisultan.student@example.com>` |
| Date | 2026-10-02 16:15:12 +05:00 |
| Changed file | `src/auth.js` |
| Problem | The required password length changed from `>= 8` to `> 20`; valid users could no longer authenticate. |
| Recommended solution | Restore the `password.length >= 8` condition, test it, and use `git revert 5edd3fe` if the bad commit is already shared. |

Commands used:

```bash
git log --oneline
git show 5edd3fe
git diff 6b780f7 5edd3fe
git bisect start
git bisect bad HEAD
git bisect good 6b780f7
git bisect run node scripts/check-auth.js
git bisect reset
```

## Task 4 — Rebase and clean history

`feature/payment` was created before `main` received commits G and H. Its three commits were rebased onto the current `main`; the rewritten commits are:

```text
14df9cd D Add payment formatter
4fd17a6 E Test payment formatter
7b1a945 F Document payment formatter
```

Commands used:

```bash
git checkout feature/payment
git rebase main
npm test
```

`merge` combines two histories and usually creates a merge commit. `rebase` replays the feature commits on top of the latest base and produces a linear history, changing commit hashes. After publishing a rebased branch, use `git push --force-with-lease`: it refuses to overwrite the remote branch if it changed unexpectedly, unlike plain `--force`.

## Task 5 — GitHub CI pipeline

The workflow is [`test.yml`](.github/workflows/test.yml). On each Pull Request to `main`, it:

1. checks out the repository;
2. sets up Node.js 22;
3. runs `npm ci`;
4. runs syntax checks with `npm run lint`;
5. runs automated tests with `npm test`.

To prevent merging on a failure, GitHub repository settings must require the workflow's `test` status check in the branch-protection rule for `main`.

## Required screenshots before submission

After publishing this repository to GitHub, add screenshots below or place them in `docs/screenshots/` and link them here:

- `git log --oneline --graph --all --decorate` showing hotfix, conflict merge, forensic branch, and rebase;
- the Pull Request from `hotfix/payment-bug` into `main` and its merged state;
- the conflict markers and the resolved `src/auth.config` file;
- a successful GitHub Actions run for a Pull Request;
- the release/tag page showing `v1.0.1`.

## GitHub publication commands

Replace `<REPOSITORY-URL>` with the HTTPS URL of the new GitHub repository:

```bash
git remote add origin <REPOSITORY-URL>
git push -u origin main
git push -u origin develop
git push -u origin hotfix/payment-bug
git push -u origin feature/password-policy
git push -u origin feature/security-rules
git push -u origin feature/payment
git push -u origin forensics/auth-history
git push origin v1.0.1
```
