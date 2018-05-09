const STORAGE_TOKEN_NAME = 'TOKEN';

/**
 * JWT 的方案
 */
export default {
  get() {
    return sessionStorage.getItem(STORAGE_TOKEN_NAME);
  },
  save(token) {
    sessionStorage.setItem(STORAGE_TOKEN_NAME, token);
  },
  remove() {
    sessionStorage.removeItem(STORAGE_TOKEN_NAME);
  },
};
