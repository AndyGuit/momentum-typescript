import { OPTIONS } from '../_options';

const timeEl = document.querySelector('.time')!;
const dateEl = document.querySelector('.date')!;
const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
};

const setDate = () => {
  const curDate = new Date().toLocaleDateString(OPTIONS.lang, dateOptions);
  dateEl.textContent = curDate;
};

const tickClock = () => {
  const curTime = new Date().toLocaleTimeString();
  timeEl.textContent = curTime;
  setDate();
  setTimeout(tickClock, 1000);
};

export const TimeAndDate = () => {
  tickClock();
};
