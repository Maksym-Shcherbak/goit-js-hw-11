import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';
let lsSavedTime = localStorage.getItem(STORAGE_KEY);

const onPlay = event => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(event.seconds));
};
console.log();
if (lsSavedTime !== null) {
  player.setCurrentTime(lsSavedTime);
}

player.on('timeupdate', throttle(onPlay, 1000));
