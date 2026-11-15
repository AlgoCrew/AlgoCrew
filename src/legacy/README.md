# Legacy routes (unlinked)

Route folders moved out of `src/app` in implementation Stage 10 (docs/website-transformation/05, 11).
Their URLs are now answered by `src/middleware.ts` from `src/resources/routeMigration.ts`:
301 to the new page, or 410 Gone. Kept for reference until the cleanup release, then deleted.
Nothing in `src/app` imports from here.
