import { languages, OPTIONS, picSource, saveOptions } from '../_options';
import { translations } from '../_translations';
import { TimeAndDate } from './TimeAndDate';
import { Greeting } from './Greeting';
import { Weather } from './Weather';
import { Quote } from './Quote';
import { ToDo } from './ToDo';
import { setBackground } from './SliderBackground';

const settingsIcon = document.querySelector('.settings i') as HTMLElement;
const settingsBlock = document.querySelector('.settings__block') as HTMLElement;
const hideBlocks = document.querySelector('.hide-blocks') as HTMLElement;
const langSelect = document.querySelector(
  '.language>select'
) as HTMLSelectElement;
const picOptions = document.querySelector(
  '.picture select'
) as HTMLSelectElement;
const tagInput = document.querySelector(
  '.picture__tags ul input'
) as HTMLInputElement;
const tagList = document.querySelector('.picture__tags ul') as HTMLElement;
const hideBlockInputs = document.querySelectorAll(
  '.hide-blocks input'
) as NodeListOf<HTMLInputElement>;

const initSettings = () => {
  langSelect.value = OPTIONS.lang;
  picOptions.value = OPTIONS.picSource;

  if (OPTIONS.hiddenBlocks.length) {
    OPTIONS.hiddenBlocks.forEach(blockName => {
      const input = document.querySelector(
        `[data-block-name="${blockName}"]`
      ) as HTMLInputElement;
      const el = document.querySelector(`.${blockName}`)!;

      input.checked = false;
      el.classList.add('hide-app-block');
    });
  }
};

const translateSettings = () => {
  const t = translations.settings;

  const languageText = document.querySelector('.language p') as HTMLElement;
  const picSourceText = document.querySelector(
    '.picture__options p'
  ) as HTMLElement;
  const tagHeader = document.querySelector(
    '.picture__tags-header p'
  ) as HTMLElement;
  const tagDesc = document.querySelector('.picture__tags > p') as HTMLElement;
  const settingsHeader = document.querySelector(
    '.settings-header'
  ) as HTMLElement;
  const blockNames = hideBlocks.querySelectorAll(
    'label'
  ) as NodeListOf<HTMLElement>;

  languageText.textContent = t.language[OPTIONS.lang];
  picSourceText.textContent = t.picSource[OPTIONS.lang];
  tagHeader.textContent = t.tagHeader[OPTIONS.lang];
  tagDesc.innerHTML = t.tagDesc[OPTIONS.lang];
  settingsHeader.textContent = t.header[OPTIONS.lang];

  blockNames.forEach(block => {
    const blockName = block.getAttribute('for');
    const blockEl = document.querySelector(`label[for="${blockName}"]`)!;
    // TODO: Fix typescript error
    // @ts-ignore
    const blockTranslation = t.blockNames[blockName];
    blockEl.textContent = blockTranslation[OPTIONS.lang];
  });
};

translateSettings();

const toggleSettings = () => {
  settingsBlock.classList.toggle('show-settings');
  settingsIcon.classList.toggle('active-icon');
};

const closeSettingsBlock = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!target.closest('.settings')) {
    settingsBlock.classList.remove('show-settings');
    settingsIcon.classList.remove('active-icon');
  }
};

const changeLanguage = (e: Event) => {
  const target = e.target as HTMLInputElement;
  OPTIONS.lang = target.value as languages;
  saveOptions();
  translateSettings();
  TimeAndDate();
  Greeting();
  Weather();
  Quote();
  ToDo();
};

const toggleBlock = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const blockName = target.dataset.blockName as string;
  const el = document.querySelector(`.${blockName}`)!;
  const isHide = !target.checked;

  if (isHide) {
    el.classList.add('hide-app-block');
    OPTIONS.hiddenBlocks.push(blockName);
    saveOptions();
  } else {
    el.classList.remove('hide-app-block');
    const index = OPTIONS.hiddenBlocks.indexOf(blockName);
    OPTIONS.hiddenBlocks.splice(index, 1);
    saveOptions();
  }
};

const changePictureSource = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  OPTIONS.picSource = target.value as picSource;
  saveOptions();
  setBackground();
};

const renderPicTag = (tag: string) => {
  const liTag = `<li>${tag}<span class="close-tag">&#10005;</span></li>`;

  tagList.insertAdjacentHTML('afterbegin', liTag);
};

const renderTagList = () => {
  OPTIONS.picTags.forEach(tag => {
    renderPicTag(tag);
  });
};

renderTagList();

const addPicTag = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    const target = e.target as HTMLInputElement;
    const tag = target.value.replace(/\s+/g, ' ');

    if (tag.length && !OPTIONS.picTags.includes(tag)) {
      if (OPTIONS.picTags.length < 4) {
        OPTIONS.picTags.push(tag);
        saveOptions();
        renderPicTag(tag);
        setBackground();
      }
    }
    target.value = '';
  }
};

const removePicTag = (e: MouseEvent) => {
  let tags = OPTIONS.picTags;
  const target = e.target as HTMLElement;
  const parent = target.parentElement as HTMLElement;
  if (parent) {
    const thisTag = parent.textContent?.slice(0, -1);
    if (thisTag) {
      const index = tags.indexOf(thisTag);
      OPTIONS.picTags = [...tags.slice(0, index), ...tags.slice(index + 1)];
      saveOptions();
      parent.remove();
      setBackground();
    }
  }
};

settingsIcon.addEventListener('click', toggleSettings);
document.body.addEventListener('click', closeSettingsBlock);
langSelect.addEventListener('change', changeLanguage);
hideBlockInputs.forEach(el => el.addEventListener('input', toggleBlock));
picOptions.addEventListener('change', changePictureSource);
tagInput.addEventListener('keydown', addPicTag);

tagList.addEventListener('click', function (e) {
  const target = e.target as HTMLElement;
  if (target.classList.contains('close-tag')) {
    removePicTag(e);
  }
});

export const Settings = () => {
  initSettings();
};
