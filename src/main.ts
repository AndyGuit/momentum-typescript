import './css/owfont-regular.css';
import './css/style.css';

import { loadOptions } from './_options';
import { TimeAndDate } from './modules/TimeAndDate';
import { Greeting } from './modules/Greeting';
import { SliderBackground } from './modules/SliderBackground';
import { Weather } from './modules/Weather';
import { Quote } from './modules/Quote';
import { AudioPlayer } from './modules/AudioPlayer';
import { ToDo } from './modules/ToDo';

loadOptions();

TimeAndDate();
Greeting();
SliderBackground();
Weather();
Quote();
AudioPlayer();
ToDo();
