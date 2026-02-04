/**
 * Secure Storage Utility
 *
 * Provides a more secure storage adapter for redux-persist that uses
 * sessionStorage for sensitive authentication data instead of localStorage.
 *
 * Security improvements over localStorage:
 * - Tokens are cleared when browser/tab is closed
 * - Data is not shared across browser tabs (isolation)
 * - Reduces window of exposure for token theft
 *
 * NOTE: For production environments, consider implementing httpOnly cookies
 * for token storage which provides better XSS protection. This requires
 * backend changes to set cookies with appropriate flags:
 * - httpOnly: true (prevents JavaScript access)
 * - secure: true (HTTPS only)
 * - sameSite: 'strict' (CSRF protection)
 */

interface SecureStorageConfig {
  useSessionStorage?: boolean
}

const config: SecureStorageConfig = {
  // Use sessionStorage for auth data in production for better security
  useSessionStorage: true,
}

const getStorage = (): Storage => {
  return config.useSessionStorage ? sessionStorage : localStorage
}

/**
 * Redux-persist compatible storage adapter that uses sessionStorage
 * for improved security of sensitive authentication data
 */
export const secureStorage = {
  getItem: (key: string): Promise<string | null> => {
    return Promise.resolve(getStorage().getItem(key))
  },
  setItem: (key: string, value: string): Promise<void> => {
    getStorage().setItem(key, value)
    return Promise.resolve()
  },
  removeItem: (key: string): Promise<void> => {
    getStorage().removeItem(key)
    return Promise.resolve()
  },
}

export default secureStorage
