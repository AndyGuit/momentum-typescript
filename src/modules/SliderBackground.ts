import { OPTIONS, picSource } from '../_options';
import { translations } from '../_translations';
import { getTimeIndex } from '../_helperFunctions';
import { getFlickrImg, getGithubImg, getUnsplashImg } from '../_apiLinks';

const slideNext = document.querySelector('.slide-next') as HTMLButtonElement;
const slidePrev = document.querySelector('.slide-prev') as HTMLButtonElement;

const maxImages = 20;
let randomImg = Math.floor(Math.random() * maxImages) + 1;

const getImgLink = async () => {
  const imgNumber = randomImg.toString().padStart(2, '0');
  const timeOfDay = translations.greeting.en[getTimeIndex()].split(' ')[1];
  const tags = OPTIONS.picTags.join(',') || timeOfDay;

  if (OPTIONS.picSource === picSource.unsplash) {
    return getUnsplashImg(tags);
  }

  if (OPTIONS.picSource === picSource.flickr) {
    return getFlickrImg(randomImg.toString(), tags);
  }

  return getGithubImg(imgNumber, timeOfDay);
};

export const setBackground = async () => {
  const img = new Image();
  img.src = await getImgLink();

  img.onload = () => {
    document.body.style.backgroundImage = `url(${img.src})`;
  };
};

slideNext.addEventListener('click', () => {
  randomImg >= maxImages ? (randomImg = 1) : randomImg++;

  setBackground();
});

slidePrev.addEventListener('click', () => {
  randomImg === 1 ? (randomImg = maxImages) : randomImg--;

  setBackground();
});

export const SliderBackground = () => {
  setBackground();
};
