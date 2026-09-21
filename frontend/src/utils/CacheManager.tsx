export const CacheManager = {
  get: (key: string) => {
    return localStorage.getItem(key);
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
