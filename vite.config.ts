/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: false,
    restoreMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.{test,spec}.{ts,tsx}',
        'src/**/*.stories.tsx',
        'src/test/**',
        'src/**/types/**',
        'src/app/env.d.ts',
        'src/app/main.tsx',
        'src/app/config.ts',
        'src/app/dependencies.ts',
        'src/modules/podcasts/domain/Episode.ts',
        'src/modules/podcasts/domain/Podcast.ts',
        'src/modules/podcasts/domain/PodcastDetail.ts',
        'src/modules/podcasts/domain/PodcastRepository.ts',
        'src/modules/podcasts/application/ports/PodcastCacheReader.ts',
        'src/shared/infrastructure/cache/CacheStore.ts',
      ],
    },
  },
});
