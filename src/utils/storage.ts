import isClient from "./isClient";

export const getStorageItem = (key: string): string | null => {
  /**
 * Retrieves an item from localStorage.
 * @param key - The key of the item to retrieve.
 * @returns The item as a string, or null if not found or on the server.
 */

  if (isClient()) {
    return localStorage.getItem(key);
  }
  return null;
};

export const setStorageItem = (key: string, value: string): void => {
  /**
   * Sets an item in localStorage.
   * @param key - The key of the item to set.
   * @param value - The value to set.
   */
  if (isClient()) {
    localStorage.setItem(key, value);
  }
};

export const removeStorageItem = (key: string): void => {
  /**
   * Removes an item from localStorage.
   * @param key - The key of the item to remove.
   */
  if (isClient()) {
    localStorage.removeItem(key);
  }
};

export const clearStorage = (): void => {
  /**
   * Clears all items from localStorage.
   */
  if (isClient()) {
    localStorage.clear();
  }
};

