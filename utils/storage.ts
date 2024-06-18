export function setLocalStorageItem(key: string, value: any): void {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }
  
  // Function to get an item from local storage
export  function getLocalStorageItem<T>(key: string): T | null {
    const stringValue = localStorage.getItem(key);
    if (stringValue === null) {
      return null;
    }
    return JSON.parse(stringValue) as T;
  }

export const CUSTOMER_KEY="customers";
export const SERVICES_KEY="services";