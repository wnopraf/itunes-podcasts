import { expect, test } from '@playwright/test';
import episodesFixture from '../src/test/fixtures/episodes.json' with { type: 'json' };
import podcastsFixture from '../src/test/fixtures/podcasts.json' with { type: 'json' };
import { sleep } from '@/test/fakes/utils';

const podcastCount = podcastsFixture.feed.entry.length;
const episodeCount = episodesFixture.results.filter(
  (r) => r.wrapperType === 'podcastEpisode',
).length;

const FAKE_NETWORK_DELAY_MS = 100;

test.beforeEach(async ({ page }) => {
  // Intercept iTunes API
  await page.route('**/*toppodcasts**', async (route) => {
    await sleep(FAKE_NETWORK_DELAY_MS);
    await route.fulfill({ json: podcastsFixture });
  });
  await page.route('**/*lookup*id**', async (route) => {
    await sleep(FAKE_NETWORK_DELAY_MS);
    await route.fulfill({ json: episodesFixture });
  });
});

test('podcast list and podcast filtering', async ({ page }) => {
  await page.goto('/');

  // Podcast list: loading state
  await expect(page.getByRole('progressbar', { name: 'Loading' })).toBeVisible();
  await expect(page.getByRole('list', { name: 'Loading podcasts' })).toBeVisible();

  // Podcast list: loaded
  const search = page.getByLabel('Search podcasts');
  await expect(search).toBeVisible();
  await expect(page.getByRole('progressbar', { name: 'Loading' })).toBeHidden();
  await expect(page.getByRole('heading', { level: 3 })).toHaveCount(podcastCount);

  // Result count badge
  await expect(page.getByRole('status', { name: `${podcastCount} results` })).toBeVisible();

  // Podcast filtering
  await search.fill('joe');
  await expect(page.getByRole('heading', { name: 'The Joe Budden Podcast' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Joe and Jada' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3 })).toHaveCount(2);
  await expect(page.getByRole('status', { name: '2 results' })).toBeVisible();

  await search.fill('');
  await expect(page.getByRole('heading', { level: 3 })).toHaveCount(podcastCount);
  await expect(page.getByRole('status', { name: `${podcastCount} results` })).toBeVisible();
});

test('navigates to podcast detail and episode detail', async ({ page }) => {
  await page.goto('/');

  // Podcast detail: loading
  await page.getByRole('link', { name: /Song Exploder/ }).click();
  await expect(page).toHaveURL(/\/podcast\/788236947$/);
  await expect(page.getByRole('table', { name: 'Loading episodes' })).toBeVisible();

  // Podcast detail: loaded
  const sidebar = page.getByRole('complementary');
  await expect(sidebar.getByRole('heading', { name: 'Song Exploder' })).toBeVisible();
  await expect(page.getByText(`Episodes: ${episodeCount}`)).toBeVisible();
  await expect(page.getByRole('progressbar', { name: 'Loading' })).toBeHidden();

  // Episode player
  await page.getByRole('link', { name: 'Elvis Costello - Alison' }).click();
  await expect(page).toHaveURL(/\/podcast\/788236947\/episode\/1000793533297$/);
  await expect(page.getByRole('heading', { name: 'Elvis Costello - Alison' })).toBeVisible();
  await expect(page.locator('audio')).toBeVisible();
});
