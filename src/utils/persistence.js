const getLocalData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const setLocalData = (key, payload) => {
  localStorage.setItem(key, JSON.stringify(payload));
};

const getSessionData = (key) => {
  return JSON.parse(sessionStorage.getItem(key));
};

const setSessionData = (key, payload) => {
  sessionStorage.setItem(key, JSON.stringify(payload));
};

export { getLocalData, setLocalData, getSessionData, setSessionData };
