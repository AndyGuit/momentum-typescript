import { getQuoteLink } from '../_apiLinks';
import { OPTIONS } from '../_options';
import { translations } from '../_translations';

const quote = document.querySelector('.quote') as HTMLElement;
const author = document.querySelector('.author') as HTMLElement;
const changeQuote = document.querySelector(
  'button.change-quote'
) as HTMLButtonElement;

interface Quote {
  author: string;
  text: string;
}

const fetchQuote = async () => {
  const url = getQuoteLink(OPTIONS.lang);

  try {
    const res = await fetch(url);
    const data: Quote[] = await res.json();

    const random = Math.floor(Math.random() * data.length);

    quote.textContent = data[random].text;
    author.textContent =
      data[random].author || translations.quoteUnknownAuthor[OPTIONS.lang];
  } catch (error) {
    quote.textContent = translations.quoteError[OPTIONS.lang];
    console.log(error);
  }
};

changeQuote.addEventListener('click', () => {
  fetchQuote();
});

export const Quote = () => {
  fetchQuote();
};
