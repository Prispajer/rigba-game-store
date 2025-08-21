export default function debounce(callback: Function, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback.apply(null, args);
    }, delay);
  };
}
