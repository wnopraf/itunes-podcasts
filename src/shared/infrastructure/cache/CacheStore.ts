export interface CacheStore {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T, ttlMs: number): void;
  remove(key: string): void;
}
