export const getTimeIndex = () => {
  const curTime = new Date().getHours();
  return Math.floor(curTime / 6);
};
