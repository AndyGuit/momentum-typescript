const play = document.querySelector('button.play') as HTMLButtonElement;
const next = document.querySelector('button.play-next') as HTMLButtonElement;
const prev = document.querySelector('button.play-prev') as HTMLButtonElement;
const trackTime = document.querySelector('.track-time') as HTMLElement;
const trackName = document.querySelector('.track-name') as HTMLElement;
const progressBar = document.querySelector(
  '.progress input'
) as HTMLInputElement;
const volumeBar = document.querySelector('.volume input') as HTMLInputElement;
const volumeButton = document.querySelector(
  '.volume button'
) as HTMLButtonElement;
const playListEl = document.querySelector('.play-list') as HTMLElement;
const audio = new Audio();

let currentTrack = 0;
audio.volume = Number.parseFloat(volumeBar.value);

const playList = [
  {
    title: 'Aqua Caelestis',
    src: './sounds/Aqua Caelestis.mp3',
    duration: '00:40',
  },
  {
    title: 'River Flows In You',
    src: './sounds/River Flows In You.mp3',
    duration: '01:37',
  },
  {
    title: 'Summer Wind',
    src: './sounds/Summer Wind.mp3',
    duration: '01:51',
  },
  {
    title: 'Ennio Morricone',
    src: './sounds/Ennio Morricone.mp3',
    duration: '01:37',
  },
];

audio.src = playList[currentTrack].src;

const renderPlaylist = () => {
  playListEl.innerHTML = '';
  playList.forEach((item, index) => {
    const li = document.createElement('li');
    const icon = document.createElement('i');
    li.className = 'play-item';
    icon.className = 'fas fa-play-circle';
    li.textContent = item.title;
    li.prepend(icon);
    playListEl.append(li);

    li.addEventListener('click', () => {
      if (index === currentTrack) {
        toggleAudio();
      } else {
        currentTrack = index;
        audio.src = playList[currentTrack].src;
        toggleAudio();
      }
    });
  });
};

const toggleAudio = () => {
  if (audio.paused) {
    audio.play();
    togglePlayIcon();
    highlightActiveTrack();
    showPlayedTrackName();
  } else {
    audio.pause();
    togglePlayIcon();
    highlightActiveTrack();
  }
};

const togglePlayIcon = () => {
  !audio.paused ? play.classList.add('pause') : play.classList.remove('pause');
};

const highlightActiveTrack = () => {
  const list = document.querySelectorAll('li.play-item i');
  list.forEach(el => (el.className = 'fas fa-play-circle'));

  if (!audio.paused) {
    list[currentTrack].className = 'fas fa-pause-circle';
  }
};

const playNext = () => {
  currentTrack >= playList.length - 1 ? (currentTrack = 0) : currentTrack++;
  audio.pause();
  audio.src = playList[currentTrack].src;
  toggleAudio();
};

const playPrev = () => {
  currentTrack <= 0 ? (currentTrack = playList.length - 1) : currentTrack--;
  audio.pause();
  audio.src = playList[currentTrack].src;
  toggleAudio();
};

const showTrackTime = () => {
  const curMin = Math.floor(audio.currentTime / 60)
    .toString()
    .padStart(2, '0');
  const curSec = Math.round(audio.currentTime - +curMin * 60)
    .toString()
    .padStart(2, '0');
  const trackLength = playList[currentTrack].duration;

  trackTime.textContent = `${curMin}:${curSec} / ${trackLength}`;
};

const showPlayedTrackName = () => {
  trackName.textContent = playList[currentTrack].title;
};

const changeVolume = (e: Event) => {
  const target = e.target as HTMLInputElement;
  audio.volume = +target.value;
  audio.muted = false;
  toggleVolumeIcon();
};

const toggleVolumeIcon = () => {
  audio.volume === 0 || audio.muted
    ? (volumeButton.className = 'fas fa-volume-mute')
    : (volumeButton.className = 'fas fa-volume-up');
};

const muteAudio = () => {
  audio.muted ? (audio.muted = false) : (audio.muted = true);
  toggleVolumeIcon();
};

const showTrackProgress = () => {
  const percentage = (audio.currentTime / audio.duration) * 100;
  progressBar.style.background = `linear-gradient(to right, #dcc659 0%, #dcc659 ${percentage}%, #fff ${percentage}%, #fff 100%)`;
};

const rewindTrack = (e: MouseEvent) => {
  const time = (+e.offsetX / progressBar.offsetWidth) * audio.duration;

  if (time > audio.duration) return;
  audio.currentTime = time;
};

const loopPlaylist = () => {
  audio.currentTime >= audio.duration && playNext();
};

play.addEventListener('click', toggleAudio);
next.addEventListener('click', playNext);
prev.addEventListener('click', playPrev);

audio.addEventListener('timeupdate', () => {
  showTrackTime();
  showTrackProgress();
  loopPlaylist();
});

volumeBar.addEventListener('input', changeVolume);
volumeButton.addEventListener('click', muteAudio);

let isMouseDown = false;
progressBar.addEventListener('click', e => {
  audio.pause();
  rewindTrack(e);
  toggleAudio();
});
progressBar.addEventListener('mousemove', e => {
  if (isMouseDown) {
    audio.pause();
    rewindTrack(e);
  }
});
progressBar.addEventListener('mousedown', () => (isMouseDown = true));
progressBar.addEventListener('mouseup', () => {
  isMouseDown = false;
  toggleAudio();
});

export const AudioPlayer = () => {
  renderPlaylist();
};
