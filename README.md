# iTunes Podcasts

Mini-app for browsing and listening to the top music podcasts from Apple, built as a frontend technical assessment.

Live demo: <https://itunes-top-podcasts.vercel.app/>

---

## About the assessment

The app has three views sharing a common header:

- Podcast list: `/`
- Podcast detail: `/podcast/:podcastId`
- Episode player: `/podcast/:podcastId/episode/:episodeId`

Some conditions from the brief:

- It has to be a SPA using clean URLs (no hash routing).
- It needs a development mode (unminified assets) and a production mode (minified assets).
- It will be reviewed on the latest Chrome for desktop, so mobile and tablet layouts are out of scope.
- Errors don't need user feedback, a console message is enough.

---

## Requirements

### Podcast list

- [x] List the 100 most popular music podcasts from Apple:
      `https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`
- [x] Cache the list for 1 day so the API is not called again while the cache is valid.
- [x] Filter the list by podcast title or author while typing.
- [x] Clicking a podcast opens its detail view.

### Podcast detail

- [x] Sidebar with the podcast image, title, author and description.
- [x] Main section with the number of episodes and a list showing title, release date and duration of each one.
- [x] Cache the podcast detail for 1 day.
- [x] Clicking an episode title opens the episode view.

### Episode player

- [x] Same sidebar as the detail view, where the title and author link back to the podcast.
- [x] Episode title, description rendered as HTML (sanitized with DOMPurify) and an HTML5 audio player.

### Header

- [x] The app title links to the main view.
- [x] A loading indicator is shown while navigating or fetching data.

---

## Stack

I chose the following tools:

- **Vite**: fast dev server and an optimized production build without having to maintain a bundler config.
- **React 19 + TypeScript**: types make the domain and API mapping easier to reason about and refactor.
- **React Router**: data router with clean URLs and lazy loaded routes.
- **CSS Modules**: scoped styles per component, plus a small global layer for reset, design tokens and base styles.
- **Vitest & React Testing Library**: unit and integration tests.
- **Playwright**: end-to-end tests.
- **Storybook**: to develop and document components in isolation, including accessibility checks.
- **oxlint & oxfmt**: linting and formatting, chosen because they are very fast.
- **Husky**: checks formatting, lint and types before each commit.
- **DOMPurify**: sanitizes the episode descriptions before rendering them.

### Architecture

The code is organized by feature modules following a hexagonal (ports and adapters) approach, so the domain doesn't depend on React or on the iTunes API:

```
src/
├── app/        # composition root, router, providers and app layouts
├── modules/
│   └── podcasts/
│       ├── domain/          # models, repository port, domain errors
│       ├── application/     # use cases and their ports
│       ├── infrastructure/  # iTunes adapter, mappers, cache decorator
│       └── presentation/    # hooks, components, layouts, contexts
├── pages/      # route components
├── shared/     # domain-agnostic UI, hooks, styles and cache
└── test/       # fixtures and fakes
```

Dependencies only point inwards: `presentation → application → domain ← infrastructure`.

- **Domain**: `Podcast`, `Episode`, the `PodcastDetail` aggregate (podcast + episodes), `PodcastNotFoundError` and the `PodcastRepository` port. All ids are `string`, matching what the router hands over.
- **Application**: `GetTopPodcasts` and `GetPodcastDetail`, plus the `PodcastCacheReader` port they use for synchronous cache reads. The cache reader lives here and not in the domain because caching is an application concern, not a business rule.
- **Infrastructure**: `ItunesPodcastRepository` talks to the API and maps its DTOs into domain models. `CachedPodcastRepository` decorates it with a `localStorage` cache.
- **Presentation**: hooks consume use cases and expose plain data to components; components never see repositories or DTOs.

#### Composition root

Everything is wired in a single place, `src/app/dependencies.ts`: it builds the cache, the iTunes adapter, the cached repository and finally the use cases through `createPodcastUseCases`. Only the use cases are exported and injected into React through `PodcastUseCasesContext`, so the UI cannot reach infrastructure by accident.

Tests and Storybook use the same factory with a fake repository (`createPodcastUseCases(fakeRepository)`), so they exercise the real use cases with controlled data.

---

## Design decisions

### Use cases

- `GetPodcastDetail` fetches the podcast detail and the top 100 in parallel, merges the description into the detail and tolerates the top request failing (see below).
- `GetTopPodcasts` fetches the podcast list. `execute` delegates to the repository; `getCached` exposes the synchronous read so the UI can render cached data on the first paint without going through the hook for it.
- Both expose the same contract — `execute` for the fetch and `getCached` for the sync read — and the hooks consume them through `usePodcastUseCases`, without knowing about repositories or the cache. Use cases return domain models unchanged, so there are no output DTOs.

### Podcast detail is resolved by id

The detail page reads the podcast from the URL id through the iTunes `lookup` endpoint, which returns the podcast and its episodes in a single response. It doesn't depend on the top 100, so shared links, page reloads and podcasts outside the ranking all work.

The only field `lookup` doesn't return is the description. `GetPodcastDetail` requests the top 100 **in parallel** and takes the description from there when the podcast is in it:

- the extra request doesn't add latency, since both run at the same time;
- in the usual flow (list → detail) the top 100 is already cached, so no request is made;
- its failure is tolerated: the detail still renders;
- when no description is available, the section is kept and shows "Description not available", so the layout matches the design.

I discarded parsing the podcast RSS feed (`feedUrl`) to get the description: it means a third-party XML request per podcast, usually through a CORS proxy, for a single field.

Unknown ids raise `PodcastNotFoundError`, which the route error boundary maps to the 404 page instead of leaving an empty sidebar.

### Cache strategy

Two complementary pieces, each with a different job:

- **`CachedPodcastRepository`** (decorator, async): cache-first. On a miss it calls the iTunes adapter and stores the result. Callers don't know a cache exists.
- **`getCached()` on the use cases** (sync): reads the cache during the first render. If data is there, the view renders immediately and no request is made; otherwise `useAsyncData` fetches through the decorator. Without it, cached views would flash a skeleton for a frame while the async read resolves.

Other details:

- Entries expire after **24 hours** (TTL stored with each entry).
- Keys use a versioned prefix (`podcaster:v2:`). Changing the prefix discards entries stored with an older shape, which was needed when episode ids moved from `number` to `string`.
- Storage errors (storage limit exceeded, corrupted JSON, disabled `localStorage`) are logged by `LocalStorageCache` and treated as a miss, so the app falls back to the network.

### Loading, errors and cancellation

- `useAsyncData` aborts in-flight requests on unmount or when the params change, through `AbortController`.
- It reports to a global loading tracker that drives the header indicator, and shows skeletons that mirror the final layout to avoid layout shifts.
- Errors are thrown during render so the route error boundary catches them. The brief only requires a console message; the app also shows an error page.

### Why a SPA without SSR

The brief asks for a SPA with clean URLs. All the data is public, cached on the client and there are no SEO requirements, so SSR would add a server runtime without a benefit. The app is deployed as static files on Vercel; `vercel.json` rewrites every path to `index.html` so direct access and reloads on `/podcast/:id` are handled by the client router instead of returning 404.

### Component boundaries

- **Pages** (`src/pages`): one per route. They read route params or the outlet context, call hooks and compose module components. They hold the only view state (e.g. the search query).
- **Layouts**: `AppLayout` (header + loading indicator) and `PodcastDetailLayout`, which loads the podcast detail once and shares it with the episode list and the episode player through the outlet context. Navigating between episodes doesn't refetch.
- **Module components** (`modules/podcasts/presentation/components`): presentational, they receive domain models by props and know nothing about data fetching. Every component has a Storybook story, and the ones that wait for data (grid, sidebar, episode table) have a matching skeleton.
- **Shared components** (`src/shared/presentation/components`): `Card`, `Input`, `Loader`, `Skeleton`. Domain-agnostic building blocks.

### Styling

Global CSS is split into cascade layers (`reset`, `tokens`, `base`, `components`, `utilities`) so specificity stays predictable. Components use CSS Modules on top of the design tokens.

Every route is lazy loaded to keep the initial bundle small.

---

## Testing strategy

Each layer is tested in isolation with fakes of the ports it depends on, so failures point to the layer that broke:

| Layer               | What is tested                                                                                                                                                                            | Examples                                                                                      |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Application         | Use cases with fake repository and cache reader: parallel requests, description merge, tolerated failures, cached reads.                                                                  | `GetPodcastDetail.test.ts`, `GetTopPodcasts.test.ts`                                          |
| Infrastructure      | Mappers against real API fixtures, the iTunes adapter with a mocked `fetch` (HTTP errors, not found, aborts), the cache decorator, URL building, `localStorage` TTL and failure handling. | `ItunesPodcastRepository.test.ts`, `PodcastDetailMapper.test.ts`, `LocalStorageCache.test.ts` |
| Shared presentation | `useAsyncData` (abort, errors, `enabled`) and the loading provider.                                                                                                                       | `useAsyncData.test.tsx`                                                                       |
| Pages / integration | Routes rendered with real use cases over a mocked repository: loading states, cached first render, filtering, not found and error pages.                                                  | `app.test.tsx`, `PodcastListPage.test.tsx`                                                    |
| E2E (Playwright)    | The app in a real browser with the iTunes requests intercepted and served from fixtures: filtering, navigation list → detail → episode, and direct access to `/podcast/:id`.              | `e2e/app.spec.ts`                                                                             |

Coverage is measured with V8 and CI fails below the configured thresholds (95 % statements, functions and lines; 90 % branches).

---

## Workflow

- Every change goes through a short-lived branch (`feat/`, `fix/`, `refactor/`, `test/`, `docs/`) and a pull request against `main`, squash-merged.
- Commits follow Conventional Commits and are kept small enough to compile and pass checks on their own.
- **Pre-commit** (Husky): format check, lint and typecheck.
- **Pre-push**: unit/integration tests and production build.
- **CI** (GitHub Actions, on every pull request): lint, format check, tests with coverage thresholds, build and Playwright E2E. Failed E2E runs upload the Playwright report as an artifact.
- **Deployment**: `main` is deployed to Vercel as a static site, with the SPA rewrite described above.

---

## Instructions

### Requirements

- Node 24 (see `.node-version`)
- pnpm (version pinned in `package.json`, you can enable it with `corepack enable`)

### Installation

- `pnpm install`

### Environment variables (optional)

- `VITE_ITUNES_BASE_URL`: iTunes API base URL. Defaults to `https://itunes.apple.com`.
- `VITE_CORS_PROXY_URL`: optional CORS proxy, the target URL is sent in the `url` query param.

### Development

- Start dev server: `pnpm dev`
- Lint: `pnpm lint`
- Format: `pnpm format` or `pnpm format:check`
- Type check: `pnpm typecheck`
- Storybook: `pnpm storybook`

### Build

- Production build: `pnpm build`
- Preview the build: `pnpm preview`

### Testing

- Unit/integration tests: `pnpm test` (watch) or `pnpm test:run`
- E2E tests: `pnpm test:e2e`
