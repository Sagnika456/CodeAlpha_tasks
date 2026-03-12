const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");
const cover = document.getElementById("cover");
const playlistEl = document.getElementById("playlist");
const visualizerBars = document.querySelectorAll(".visualizer div");

let songs = [
  { name: "Song 1", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { name: "Song 2", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { name: "Song 3", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { name: "Song 4", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { name: "Song 5", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" }
];

let songIndex = 0;
let isShuffle = false;
let isRepeat = false;

function loadSong(song) {
  audio.src = song.src;
  document.getElementById("title").innerText = song.name;
  highlightActive();
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸";
    cover.style.animationPlayState = "running";
    visualizerBars.forEach(bar => bar.style.animationPlayState = "running");
  } else {
    audio.pause();
    playBtn.innerText = "▶";
    cover.style.animationPlayState = "paused";
    visualizerBars.forEach(bar => bar.style.animationPlayState = "paused");
  }
}

function nextSong() {
  if (isShuffle) {
    songIndex = Math.floor(Math.random() * songs.length);
  } else {
    songIndex = (songIndex + 1) % songs.length;
  }
  loadSong(songs[songIndex]);
  audio.play();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
}

shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.style.color = isShuffle ? "#00ffcc" : "white";
});

repeatBtn.addEventListener("click", () => {
  isRepeat = !isRepeat;
  repeatBtn.style.color = isRepeat ? "#00ffcc" : "white";
});

audio.addEventListener("ended", () => {
  if (isRepeat) {
    audio.play();
  } else {
    nextSong();
  }
});

audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;
  progress.style.width = (currentTime / duration) * 100 + "%";
  currentTimeEl.innerText = formatTime(currentTime);
  durationEl.innerText = formatTime(duration);
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

progressContainer.addEventListener("click", (e) => {
  audio.currentTime = (e.offsetX / progressContainer.clientWidth) * audio.duration;
});

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.innerText = song.name;
  li.addEventListener("click", () => {
    songIndex = index;
    loadSong(song);
    audio.play();
  });
  playlistEl.appendChild(li);
});

function highlightActive() {
  document.querySelectorAll(".playlist li").forEach((li, index) => {
    li.classList.toggle("active", index === songIndex);
  });
}

loadSong(songs[songIndex]);
playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);