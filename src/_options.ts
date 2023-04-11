enum picSource {
  github = 'github',
  flickr = 'flickr',
  unsplash = 'unsplash',
}

type languages = 'en' | 'ua';

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
