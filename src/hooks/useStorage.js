import { useCallback, useState, useEffect } from 'react';

const useStorage = (key, defaultValue, storage) => {
  const [value, setValue] = useState(() => {
    const jsonValue = storage.getItem(key);
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }

    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  });

  useEffect(() => {
    if (value === undefined) {
      return storage.removeItem(key);
    }

    storage.setItem(key, JSON.stringify(value));
  }, [key, value, storage])

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, remove]
};

const useLocalStorage = (key, defaultValue) => useStorage(key, defaultValue, window?.localStorage);
const useSessionStorage = (key, defaultValue) => useStorage(key, defaultValue, window?.sessionStorage);

export { useLocalStorage, useSessionStorage };