
export default function throttle(callback: Function, limit: number) {
  let wait = false;
  return function () {
    if (!wait) {
      callback.apply(null, arguments);
      wait = true;
      setTimeout(() => wait = false, limit);
    }
  }
}