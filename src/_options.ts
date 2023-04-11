export enum picSource {
  github = 'github',
  flickr = 'flickr',
  unsplash = 'unsplash',
}

export type languages = 'en' | 'ua';

interface Options {
  name: string;
  city: string;
  lang: languages;
  picSource: picSource;
  hiddenBlocks: string[];
  todoList: string[];
  picTags: string[];
}

export const OPTIONS: Options = {
  name: '',
  city: 'Kyiv',
  lang: 'en',
  picSource: picSource.github,
  hiddenBlocks: [],
  todoList: [],
  picTags: [],
};

export const loadOptions = () => {
  Object.keys(OPTIONS).forEach(key => {
    const item = localStorage.getItem(key);
    const isArray = Array.isArray(OPTIONS[key as keyof Options]);

    // TODO: Fix typescript error
    if (item && !isArray) OPTIONS[key as keyof Options] = item;

    if (isArray && item) OPTIONS[key as keyof Options] = item.split(',');
  });
};

export const saveOptions = () => {
  Object.keys(OPTIONS).forEach(key => {
    let opt = OPTIONS[key as keyof Options];

    if (Array.isArray(opt)) {
      opt = opt.join(',');
    }

    localStorage.setItem(key, opt);
  });
};
