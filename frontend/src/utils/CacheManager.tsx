export const CacheManager = {
  get: (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  save: (key: string, data: any[]) => {
    return localStorage.setItem(key, JSON.stringify(data));
  },

  clear: () => {
    return localStorage.clear();
  },

  delete: (key: string) => {
    return localStorage.removeItem(key);
  },
};
