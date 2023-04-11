export const getGithubImg = (imgNum: string, tag: string) => {
  return `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${tag}/${imgNum}.jpg`;
};

const unsplashKey = '7ujidxk950M1vbghIqHgUXaODWIEEKDKilnv7eeiWJU';

export const getUnsplashImg = async (tag: string) => {
  const url = `https://api.unsplash.com/photos/random?query=${tag}&client_id=${unsplashKey}`;
  const res = await fetch(url);
  const { urls } = await res.json();
  return urls.regular;
};

const flickrKey = '9ff3c0b8944f4f287cb74c77ca1ed047';

export const getFlickrImg = async (imgNum: string, tag: string) => {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrKey}&tags=${tag}&tag_mode=any&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const { photos } = await res.json();
  console.log(imgNum, tag);
  console.log(photos);
  return photos.photo[imgNum].url_l;
};
