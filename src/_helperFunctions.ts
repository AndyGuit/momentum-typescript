export const getTimeIndex = () => {
  const curTime = new Date().getHours();
  return Math.floor(curTime / 6);
};

export const debouncer = (func: Function, wait: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};
