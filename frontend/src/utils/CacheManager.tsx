export const CacheManager = {
  getArray: (key: string): any[] | null => {
    const data = localStorage.getItem(key);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  },

  saveArray: (key: string, data: any[]): void => {
    localStorage.setItem(key, JSON.stringify(data));
  },

  getString: (key: string): string | null => {
    return localStorage.getItem(key);
  },

  saveString: (key: string, value: string): void => {
    localStorage.setItem(key, value);
  },

  delete: (key: string): void => {
    localStorage.removeItem(key);
  },

  clear: (): void => {
    localStorage.clear();
  },
};
