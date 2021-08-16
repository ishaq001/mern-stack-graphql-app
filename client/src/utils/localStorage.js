export const setItem = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key) => {
  let value = null;
  try {
    value = JSON.parse(window.localStorage.getItem(key));
  } catch (error) {
    return null;
  }
  return value;
};

export const removeItem = (key) => {
  window.localStorage.removeItem(key);
};
