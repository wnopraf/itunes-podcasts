import { LocalStorageCache } from './LocalStorageCache';

const createStorage = () => {
  const data = new Map<string, string>();
  const getItem = vi.fn((key: string) => data.get(key) ?? null);
  const setItem = vi.fn((key: string, value: string) => {
    data.set(key, value);
  });
  const removeItem = vi.fn((key: string) => {
    data.delete(key);
  });
  const storage = { getItem, setItem, removeItem } as unknown as Storage;
  return { storage, getItem, setItem, removeItem };
};

const silenceErrors = () => vi.spyOn(console, 'error').mockImplementation(() => {});

describe('LocalStorageCache', () => {
  it('returns null for a missing key', () => {
    const { storage } = createStorage();
    const cache = new LocalStorageCache('app:', storage);

    expect(cache.get('key')).toBeNull();
  });

  it('stores and retrieves values using the configured prefix', () => {
    const { storage, setItem } = createStorage();
    const cache = new LocalStorageCache('app:', storage);
    cache.set('key', { a: 1 }, 1000);

    expect(setItem).toHaveBeenCalledWith('app:key', expect.any(String));
    expect(cache.get('key')).toEqual({ a: 1 });
  });

  it('returns null and removes expired entries', () => {
    const { storage, removeItem } = createStorage();
    const cache = new LocalStorageCache('app:', storage);
    let now = 1000;
    vi.spyOn(Date, 'now').mockImplementation(() => now);

    cache.set('key', 'value', 1000);
    expect(cache.get('key')).toBe('value');

    now = 2000;
    expect(cache.get('key')).toBeNull();
    expect(removeItem).toHaveBeenCalledWith('app:key');
  });

  it('recovers from invalid JSON and removes the entry', () => {
    const { storage, setItem, removeItem } = createStorage();
    const errorSpy = silenceErrors();
    setItem('app:key', '{invalid');

    expect(new LocalStorageCache('app:', storage).get('key')).toBeNull();
    expect(removeItem).toHaveBeenCalledWith('app:key');
    expect(errorSpy).toHaveBeenCalled();
  });

  it('recovers when reading from storage throws', () => {
    const { storage, getItem } = createStorage();
    const errorSpy = silenceErrors();
    getItem.mockImplementation(() => {
      throw new Error('denied');
    });

    expect(new LocalStorageCache('app:', storage).get('key')).toBeNull();
    expect(errorSpy).toHaveBeenCalled();
  });

  it('recovers when writing to storage throws', () => {
    const { storage, setItem } = createStorage();
    const errorSpy = silenceErrors();
    setItem.mockImplementation(() => {
      throw new Error('quota exceeded');
    });

    expect(() => new LocalStorageCache('app:', storage).set('key', 'value', 1000)).not.toThrow();
    expect(errorSpy).toHaveBeenCalled();
  });

  it('recovers when removing from storage throws', () => {
    const { storage, removeItem } = createStorage();
    const errorSpy = silenceErrors();
    removeItem.mockImplementation(() => {
      throw new Error('denied');
    });

    expect(() => new LocalStorageCache('app:', storage).remove('key')).not.toThrow();
    expect(errorSpy).toHaveBeenCalled();
  });
});
