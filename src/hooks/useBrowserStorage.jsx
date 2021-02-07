import { useState } from "react";
import {
  getLocalData,
  setLocalData,
  getSessionData,
  setSessionData
} from "../utils/persistence";

export const useLocalStorage = (storageKey, defaultValue) => {
  const [localStorageState, setLocalStorageState] = useState(
    getLocalData(storageKey) || defaultValue
  );

  const setState = (newState) => {
    setLocalData(storageKey, newState);
    setLocalStorageState(newState);
  };

  return [localStorageState, setState];
};

export const useSessionStorage = (storageKey, defaultValue) => {
  const [sessionStorageState, setSessionStorageState] = useState(
    getSessionData(storageKey) || defaultValue
  );

  const setState = (newState) => {
    setSessionData(storageKey, newState);
    setSessionStorageState(newState);
  };

  return [sessionStorageState, setState];
};
