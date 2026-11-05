import type { CacheStore } from '@/shared/infrastructure/cache/CacheStore';

export const createMemoryCacheStore = (): CacheStore => {
  const store = new Map<string, string>();
  return {
    get: <T>(key: string) => {
      const value = store.get(key);
      return value ? (JSON.parse(value) as T) : null;
    },
    set: (key, value) => {
      store.set(key, JSON.stringify(value));
    },
    remove: (key) => {
      store.delete(key);
    },
  };
};
