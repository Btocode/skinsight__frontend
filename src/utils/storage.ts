import isClient from "./isClient";

export const getStorageItem = (key: string): string | null => {
  /**
 * Retrieves an item from localStorage.
 * @param key - The key of the item to retrieve.
 * @returns The item as a string, or null if not found or on the server.
 */

  if (isClient()) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting item from localStorage: ${error}`);
      return null;
    }
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
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting item in localStorage: ${error}`);
    }
  }
};

export const removeStorageItem = (key: string): void => {
  /**
   * Removes an item from localStorage.
   * @param key - The key of the item to remove.
   */
  if (isClient()) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from localStorage: ${error}`);
    }
  }
};

export const clearStorage = (): void => {
  /**
   * Clears all items from localStorage.
   */
  if (isClient()) {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing localStorage: ${error}`);
    }
  }
};

