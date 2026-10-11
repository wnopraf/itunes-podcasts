import type { CacheStore } from './CacheStore';

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class LocalStorageCache implements CacheStore {
  private readonly prefix: string;
  private readonly storage: Storage;

  constructor(prefix: string, storage: Storage = globalThis.localStorage) {
    this.prefix = prefix;
    this.storage = storage;
  }

  get<T>(key: string): T | null {
    try {
      const serializedData = this.storage.getItem(this.prefix + key);
      if (!serializedData) return null;

      const parsedData = JSON.parse(serializedData) as CacheEntry<T>;
      if (Date.now() >= parsedData.expiresAt) {
        this.remove(key);
        return null;
      }
      return parsedData.value;
    } catch (error) {
      console.error('[LocalStorageCache] get', key, error);
      this.remove(key);
      return null;
    }
  }

  set<T>(key: string, value: T, ttlMs: number): void {
    try {
      const entry: CacheEntry<T> = { value, expiresAt: Date.now() + ttlMs };
      this.storage.setItem(this.prefix + key, JSON.stringify(entry));
    } catch (error) {
      console.error('[LocalStorageCache] set', key, error);
    }
  }

  remove(key: string): void {
    try {
      this.storage.removeItem(this.prefix + key);
    } catch (error) {
      console.error('[LocalStorageCache] remove', key, error);
    }
  }
}
