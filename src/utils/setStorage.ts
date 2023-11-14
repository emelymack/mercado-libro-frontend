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

export function clearLocalStorage() {
  try {
    if (typeof window.localStorage !== "undefined") {
      const chakraColorMode = window.localStorage.getItem(
        "chakra-ui-color-mode"
      );
      window.localStorage.clear();
      if (chakraColorMode) {
        window.localStorage.setItem("chakra-ui-color-mode", chakraColorMode);
      }
    } else {
      console.warn("Local storage is not available.");
    }
  } catch (error) {
    console.error("Failed to clear local storage:", error);
  }
}
