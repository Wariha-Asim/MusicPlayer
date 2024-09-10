const audios = [
    document.getElementById('audio1'),
    document.getElementById('audio2'),
    document.getElementById('audio3')
];
const playPauseBtn = document.getElementById('playPauseBtn');
const stopBtn = document.getElementById('stopBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const albumCover = document.getElementById('albumCover');

const covers = [
    'singer.webp',    
    'img2.jpeg',      
    'img3.PNG'        
]
let currentIndex = 0;

function loadAndPlayAudio(index) {
    audios.forEach((audio, i) => {
        if (i === index) {
            audio.play();
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    });
    albumCover.src = covers[index];
    updateButtonLabel();
}

function updateButtonLabel() {
    if (audios[currentIndex].paused) {
        playPauseBtn.textContent = 'Play';
    } else {
        playPauseBtn.textContent = 'Pause';
    }
}

playPauseBtn.addEventListener('click', () => {
    const currentAudio = audios[currentIndex];
    if (currentAudio.paused) {
        currentAudio.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        currentAudio.pause();
        playPauseBtn.textContent = 'Play';
    }
});

stopBtn.addEventListener('click', () => {
    const currentAudio = audios[currentIndex];
    currentAudio.pause();
    currentAudio.currentTime = 0;
    playPauseBtn.textContent = 'Play';
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + audios.length) % audios.length;
    loadAndPlayAudio(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % audios.length;
    loadAndPlayAudio(currentIndex);
});

audios.forEach(audio => {
    audio.addEventListener('timeupdate', () => {
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
        durationDisplay.textContent = formatTime(audio.duration);
    });
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const secsStr = secs < 10 ? '0' + secs : secs;
    return `${minutesStr}:${secsStr}`;
}


loadAndPlayAudio(currentIndex);
