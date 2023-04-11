import { getWeatherLink } from '../_apiLinks';
import { OPTIONS, saveOptions } from '../_options';
import { translations } from '../_translations';
import { debouncer } from '../_helperFunctions';

const icon = document.querySelector('.weather-icon') as HTMLElement;
const desc = document.querySelector('.weather-description') as HTMLElement;
const errorMsg = document.querySelector('.weather-error') as HTMLElement;
const temperature = document.querySelector('.temperature') as HTMLElement;
const wind = document.querySelector('.wind') as HTMLElement;
const humidity = document.querySelector('.humidity') as HTMLElement;
const city = document.querySelector('input.city') as HTMLInputElement;

interface WeatherRes {
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  main: {
    temp: number;
    humidity: string;
  };
  wind: {
    speed: number;
  };
}

// Display saved city to input field
city.value = OPTIONS.city;

const renderWeather = (data: WeatherRes) => {
  errorMsg.textContent = '';
  icon.className = `weather-icon owf owf-${data.weather[0].id}`;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  desc.textContent = data.weather[0].description;
  wind.textContent = `${translations.wind[OPTIONS.lang]}: ${data.wind.speed} ${
    translations.windValue[OPTIONS.lang]
  }`;
  humidity.textContent = `${translations.humidity[OPTIONS.lang]}: ${
    data.main.humidity
  }%`;
};

const renderError = () => {
  [desc, wind, humidity, temperature].forEach(el => (el.textContent = ''));

  errorMsg.textContent = translations.weatherError[OPTIONS.lang];
};

const fetchWeatherData = async (city: string) => {
  const url = getWeatherLink(city, OPTIONS.lang);

  try {
    const data: WeatherRes = await (await fetch(url)).json();

    renderWeather(data);
  } catch (err) {
    renderError();

    console.log(err);
  }
};

const weatherFunc = () => {
  fetchWeatherData(city.value);
  OPTIONS.city = city.value;
  saveOptions();
};

city.addEventListener('input', debouncer(weatherFunc, 600));

export const Weather = () => {
  fetchWeatherData(OPTIONS.city);
};
