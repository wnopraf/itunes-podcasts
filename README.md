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

I organized the code by feature modules following a hexagonal approach, so the domain doesn't depend on React or on the iTunes API:

```
src/
├── app/        # router, providers, layouts and dependency wiring
├── modules/
│   └── podcasts/
│       ├── domain/
│       ├── application/
│       ├── infrastructure/
│       └── presentation/
├── pages/      # route components
├── shared/     # reusable UI, hooks, styles and cache
└── test/       # fixtures and fakes
```

The iTunes adapter is wrapped by a cached repository that stores responses in `localStorage` for 1 day. The UI can also read the cache synchronously, so cached views render right away instead of showing a skeleton first. Repositories are provided through React context as root container making it easier to use fixture data in tests and Storybook.

Global CSS is split into cascade layers (`reset`, `tokens`, `base`, `components`, `utilities`) so specificity stays predictable.

Every route is lazy loaded to keep the initial bundle small to help performance and Core Web Vitals.

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
