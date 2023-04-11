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
  todoList: ['todo 1', 'todo 2'],
  picTags: [],
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
