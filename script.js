const jsmediatags = window.jsmediatags;
const musicContainer = document.querySelector(".music-container");
const more_info_content = document.querySelector(".more_info_content");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const tabTitle = document.querySelector("#tab-title");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

// Bg Animation Effect
function bgAnimationItems() {
  const rows = 9,
    cols = 10;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const div = document.createElement("div");
      div.className = `col-${j + 1}`;
      document.querySelector(".bg-animation-effect").appendChild(div);
    }
  }
}
bgAnimationItems();

// Song titles
const songs = [
  "STAR WALKIN’ (League of Legends Worlds Anthem) - Lil Nas X",
  "Dance Monkey - Tones and I",
  "Dear God - Dax",
  "Fake Ex - Yaw Tog",
  "Thought Those Were My Last Words - Dax",
  "This Fffire (Rich Costey re‐record) - Franz Ferdinand",
  "Dear Alcohol - Dax",
  "Number One (PV Remix)  - PV",
  "Shape of You - Ed Sheeran",
  "I Really Want to Stay at Your House - Rosa Walton",
];

//No Song Playing Cover
cover.style.backgroundImage = 'url("./assets/images/1.jpg")';
cover.style.backgroundSize = "cover";

// Keep track of song
let songIndex = [Math.floor(Math.random() * 10)];

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  tabTitle.innerText;
  title.innerText;
  audio.src = `assets/audio/${song}.mp3`;
  cover.style.backgroundImage;
}

// Play song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime(e) {
  const { duration, currentTime } = e.srcElement;
  var sec;
  var sec_d;

  // define minutes currentTime
  let min = currentTime == null ? 0 : Math.floor(currentTime / 60);
  min = min < 10 ? "0" + min : min;

  // define seconds currentTime
  function get_sec(x) {
    if (Math.floor(x) >= 60) {
      for (var i = 1; i <= 60; i++) {
        if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
          sec = Math.floor(x) - 60 * i;
          sec = sec < 10 ? "0" + sec : sec;
        }
      }
    } else {
      sec = Math.floor(x);
      sec = sec < 10 ? "0" + sec : sec;
    }
  }

  get_sec(currentTime, sec);

  // change currentTime DOM
  currTime.innerHTML = min + ":" + sec;

  // define minutes duration
  let min_d = isNaN(duration) === true ? "0" : Math.floor(duration / 60);
  min_d = min_d < 10 ? "0" + min_d : min_d;

  function get_sec_d(x) {
    if (Math.floor(x) >= 60) {
      for (var i = 1; i <= 60; i++) {
        if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
          sec_d = Math.floor(x) - 60 * i;
          sec_d = sec_d < 10 ? "0" + sec_d : sec_d;
        }
      }
    } else {
      sec_d = isNaN(duration) === true ? "0" : Math.floor(x);
      sec_d = sec_d < 10 ? "0" + sec_d : sec_d;
    }
  }

  // define seconds duration

  get_sec_d(duration);

  // change duration DOM
  durTime.innerHTML = min_d + ":" + sec_d;
}

// Event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }

  //Read Audio Tags
  jsmediatags.read(audio.src, {
    onSuccess: function (tag) {
      //Converting Image Tag data
      const data = tag.tags.picture.data;
      const format = tag.tags.picture.format;
      let base64String = "";

      for (let i = 0; i < data.length; i++)
        base64String += String.fromCharCode(data[i]);

      //Reading Image Tag
      cover.style.backgroundImage = `url("data:${format};base64,${window.btoa(
        base64String
      )}")`;
      cover.style.backgroundSize = "cover";
      //Reading Title Tag
      title.innerText = tag.tags.title;
      tabTitle.innerText = tag.tags.title;
    },
    onError: function (error) {
      console.log(":(", error.type, error.info);
    },
  });
});

// Change song
prevBtn.addEventListener("click", () => {
  prevSong();
  
   //when you click on the more_info button
   more_info.addEventListener("click", () => {
    console.log("more_info");
    //add active to the class more_info_content
    more_info_content.classList.add("active");

    //adding song metadata
    song_title.innerText = title.innerText;
    song_artist.innerText = artist.innerText;
    song_album.innerText = album.innerText;
    song_genre.innerText = genre.innerText;
    song_year.innerText = year.innerText;
  });
  //getting metadata from the audio file
jsmediatags.read(audio.src, {
  onSuccess: function (tag) {
    //Reading Title Tag
    title.innerText = tag.tags.title;
    tabTitle.innerText = tag.tags.title;
    //Reading Artist Tag
    artist.innerText = tag.tags.artist;
    //Reading Album Tag
    album.innerText = tag.tags.album;
    //Reading Genre Tag
    genre.innerText = tag.tags.genre;
    //Reading Year Tag
    year.innerText = tag.tags.year;
  },
});

  jsmediatags.read(audio.src, {
    onSuccess: function (tag) {
      //Read Audio Tags
      const data = tag.tags.picture.data;
      const format = tag.tags.picture.format;
      let base64String = "";

      for (let i = 0; i < data.length; i++)
        base64String += String.fromCharCode(data[i]);

      //Reading Image Tag
      cover.style.backgroundImage = `url("data:${format};base64,${window.btoa(
        base64String
      )}")`;
      cover.style.backgroundSize = "cover";
      //Reading Title Tag
      title.innerText = tag.tags.title;
      tabTitle.innerText = tag.tags.title;
    },
    onError: function (error) {
      console.log(":(", error.type, error.info);
    },
  });
});
nextBtn.addEventListener("click", () => {
  nextSong();
 
  
   //when you click on the more_info button
   more_info.addEventListener("click", () => {
    console.log("more_info");
    //add active to the class more_info_content
    more_info_content.classList.add("active");

    //adding song metadata
    song_title.innerText = title.innerText;
    song_artist.innerText = artist.innerText;
    song_album.innerText = album.innerText;
    song_genre.innerText = genre.innerText;
    song_year.innerText = year.innerText;
  });
  //getting metadata from the audio file
jsmediatags.read(audio.src, {
  onSuccess: function (tag) {
    //Reading Title Tag
    title.innerText = tag.tags.title;
    tabTitle.innerText = tag.tags.title;
    //Reading Artist Tag
    artist.innerText = tag.tags.artist;
    //Reading Album Tag
    album.innerText = tag.tags.album;
    //Reading Genre Tag
    genre.innerText = tag.tags.genre;
    //Reading Year Tag
    year.innerText = tag.tags.year;
  },
});

  jsmediatags.read(audio.src, {
    onSuccess: function (tag) {
      //Read Audio Tags
      const data = tag.tags.picture.data;
      const format = tag.tags.picture.format;
      let base64String = "";

      for (let i = 0; i < data.length; i++)
        base64String += String.fromCharCode(data[i]);

      //Reading Image Tag
      cover.style.backgroundImage = `url("data:${format};base64,${window.btoa(
        base64String
      )}")`;
      cover.style.backgroundSize = "cover";
      //Reading Title Tag
      title.innerText = tag.tags.title;
      tabTitle.innerText = tag.tags.title;
    },
    onError: function (error) {
      console.log(":(", error.type, error.info);
    },
  });
});

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", () => {
  nextSong();
  //Read Audio Tags
  jsmediatags.read(audio.src, {
    onSuccess: function (tag) {
      //Converting Image Tag data
      const data = tag.tags.picture.data;
      const format = tag.tags.picture.format;
      let base64String = "";

      for (let i = 0; i < data.length; i++)
        base64String += String.fromCharCode(data[i]);

      //Reading Image Tag
      cover.style.backgroundImage = `url("data:${format};base64,${window.btoa(
        base64String
      )}")`;
      cover.style.backgroundSize = "cover";
      //Reading Title Tag
      title.innerText = tag.tags.title;
      tabTitle.innerText = tag.tags.title;
    },
    onError: function (error) {
      console.log(":(", error.type, error.info);
    },
  });
});

// Time of song
audio.addEventListener("timeupdate", DurTime);

 //when you click on the more_info button
 more_info.addEventListener("click", () => {
  console.log("more_info");
  //add active to the class more_info_content
  more_info_content.classList.add("active");

  //adding song metadata
  song_title.innerText = title.innerText;
  song_artist.innerText = artist.innerText;
  song_album.innerText = album.innerText;
  song_genre.innerText = genre.innerText;
  song_year.innerText = year.innerText;
});
//getting metadata from the audio file
jsmediatags.read(audio.src, {
onSuccess: function (tag) {
  //Reading Title Tag
  title.innerText = tag.tags.title;
  tabTitle.innerText = tag.tags.title;
  //Reading Artist Tag
  artist.innerText = tag.tags.artist;
  //Reading Album Tag
  album.innerText = tag.tags.album;
  //Reading Genre Tag
  genre.innerText = tag.tags.genre;
  //Reading Year Tag
  year.innerText = tag.tags.year;
},
});
