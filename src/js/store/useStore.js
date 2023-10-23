export const useStore = (key, initialValue = null) => {
  if (initialValue !== null) {
    const lastValue = JSON.parse(localStorage.getItem(key))
    if (!lastValue) {
      localStorage.setItem(key, JSON.stringify(initialValue))
    }
  }
  
  return {
    get value() {
      return JSON.parse(localStorage.getItem(key))
    },
    set value(val) {
      localStorage.setItem(key, JSON.stringify(val))
    }
  }
}