export default function setLocalStorageItem(key: string, value: string) {
  try {
    if (typeof window.localStorage !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      console.warn("Local storage is not available.");
    }
  } catch (error) {
    console.error("Failed to set local storage item:", error);
  }
}
