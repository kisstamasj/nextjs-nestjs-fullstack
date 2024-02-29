export const useLocalStorage = <T>() => {
  const getItem = (key: string) => {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value) as T;
    }
  };

  const setItem = (key: string, value: T) =>
      localStorage.setItem(key, JSON.stringify(value));

  const removeItem = (key: string) => localStorage.removeItem(key);

  return {
    getItem,
    setItem,
    removeItem
  };
};
