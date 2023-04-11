import { OPTIONS } from '../_options';
import { translations } from '../_translations';
import { getTimeIndex } from '../_helperFunctions';

const greetingEl = document.querySelector('.greeting')!;
const nameInput = document.querySelector('input.name') as HTMLInputElement;

const setGreeting = () => {
  const timeIndex = getTimeIndex();

  greetingEl.textContent = translations.greeting[OPTIONS.lang][timeIndex];

  setTimeout(setGreeting, 1000);
};

const setName = (name: string) => {
  nameInput.placeholder = translations.namePlaceholder[OPTIONS.lang];
  nameInput.value = name;
};

nameInput.addEventListener('input', () => {
  const name = nameInput.value;
  setName(name);
  localStorage.setItem('name', name);
});

export const Greeting = () => {
  setGreeting();
  setName(OPTIONS.name);
};
