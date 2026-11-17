
// Music Data
const songs = [
    {
        title: "Dreams Forever",
        artist: "Alex Morgan",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500",
        src: "songs/song1.mp3"
    },
    {
        title: "Night Vibes",
        artist: "Sarah Johnson",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500",
        src: "songs/song2.mp3"
    },
    {
        title: "Summer Memories",
        artist: "David Smith",
        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=500",
        src: "songs/song3.mp3"
    }
];

const playlists = [
    {
        title: "Chill Music",
        description: "Relax and enjoy",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500"
    },
    {
        title: "Workout Hits",
        description: "Energy and motivation",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500"
    },
    {
        title: "Romantic Songs",
        description: "Love and feelings",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500"
    }
];

const artists = [
    {
        name: "Alex Morgan",
        genre: "Pop Artist",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300"
    },
    {
        name: "Sarah Johnson",
        genre: "Rock Artist",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300"
    },
    {
        name: "David Smith",
        genre: "Jazz Artist",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300"
    },
    {
        name: "Emma Wilson",
        genre: "Singer",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300"
    }
];

// HTML Elements
const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");
const playerImage = document.getElementById("playerImage");

const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const waveform = document.getElementById("waveform");

let currentSongIndex = 0;

// Display Albums
function displayAlbums() {
    const albumGrid = document.getElementById("albumGrid");

    albumGrid.innerHTML = songs.map((song, index) => `
        <div class="music-card">
            <img src="${song.image}" alt="${song.title}">
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
            <button class="card-play" onclick="playSong(${index})">
                ▶ Play Song
            </button>
        </div>
    `).join("");
}

// Display Playlists
function displayPlaylists() {
    const playlistGrid = document.getElementById("playlistGrid");

    playlistGrid.innerHTML = playlists.map((playlist, index) => `
        <div class="playlist-card">
            <img src="${playlist.image}" alt="${playlist.title}">
            <h3>${playlist.title}</h3>
            <p>${playlist.description}</p>
            <button class="card-play" onclick="playSong(${index})">
                ▶ Listen Now
            </button>
        </div>
    `).join("");
}

// Display Artists
function displayArtists() {
    const artistGrid = document.getElementById("artistGrid");

    artistGrid.innerHTML = artists.map(artist => `
        <div class="artist-card">
            <img src="${artist.image}" alt="${artist.name}">
            <h3>${artist.name}</h3>
            <p>${artist.genre}</p>
        </div>
    `).join("");
}

// Load Song
function loadSong(index) {
    currentSongIndex = index;

    const song = songs[currentSongIndex];

    audio.src = song.src;

    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;
    playerImage.src = song.image;

    progressBar.value = 0;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";
}

// Play Song
function playSong(index) {
    loadSong(index);

    audio.play()
        .then(() => {
            updatePlayButton();
        })
        .catch(error => {
            console.log("Audio playback error:", error);
            updatePlayButton();
        });
}

// Play and Pause
playBtn.addEventListener("click", () => {

    if (!audio.src) {
        playSong(0);
        return;
    }

    if (audio.paused) {
        audio.play().catch(error => {
            console.log("Playback error:", error);
        });
    } else {
        audio.pause();
    }
});

// Update Play Button
function updatePlayButton() {
    if (audio.paused) {
        playBtn.textContent = "▶";
        waveform.classList.remove("playing");
    } else {
        playBtn.textContent = "❚❚";
        waveform.classList.add("playing");
    }
}

audio.addEventListener("play", updatePlayButton);
audio.addEventListener("pause", updatePlayButton);

// Next Song
function nextSong() {
    let nextIndex = (currentSongIndex + 1) % songs.length;
    playSong(nextIndex);
}

nextBtn.addEventListener("click", nextSong);

// Previous Song
function previousSong() {
    let previousIndex =
        (currentSongIndex - 1 + songs.length) % songs.length;

    playSong(previousIndex);
}

prevBtn.addEventListener("click", previousSong);

// Format Time
function formatTime(time) {
    if (isNaN(time)) return "0:00";

    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Audio Metadata Event
audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
    progressBar.max = audio.duration;
});

// Time Update Event
audio.addEventListener("timeupdate", () => {

    progressBar.value = audio.currentTime;

    currentTime.textContent =
        formatTime(audio.currentTime);
});

// Seek Music
progressBar.addEventListener("input", () => {
    audio.currentTime = Number(progressBar.value);
});

// Volume Control
audio.volume = 0.7;

volumeBar.addEventListener("input", () => {
    audio.volume = Number(volumeBar.value);
});

// Song Ended Event
audio.addEventListener("ended", () => {
    nextSong();
});

// Waveform Animation
for (let i = 0; i < 30; i++) {
    const bar = document.createElement("span");
    waveform.appendChild(bar);
}

// Mobile Navigation
const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".navbar nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
});

nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});

// Initialize Website
displayAlbums();
displayPlaylists();
displayArtists();
loadSong(0);
