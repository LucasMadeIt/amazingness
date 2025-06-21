window.addEventListener('DOMContentLoaded', () => {
  const splashScreen = document.getElementById('splash-screen');
  const skipBtn = document.getElementById('skip-btn');
  const speakerBtn = document.getElementById('speaker-btn');
  const audio = document.getElementById('splash-audio');

  let hasPlayedAudio = false;
  let fadeStarted = false;

  speakerBtn.addEventListener('click', () => {
    if (!hasPlayedAudio) {
      audio.volume = 1;
      audio.muted = false;
      audio.play().then(() => {
        hasPlayedAudio = true;
        console.log('Audio started.');
      }).catch(e => {
        console.warn('Audio play blocked:', e);
      });
    } else {
      audio.muted = !audio.muted;
    }
    speakerBtn.textContent = audio.muted ? '🔇' : '🔊';
    speakerBtn.setAttribute('aria-pressed', String(!audio.muted));
  });

  audio.addEventListener('ended', () => {
    if (!fadeStarted) {
      startFadeOut();
    }
  });

  skipBtn.addEventListener('click', () => {
    if (!fadeStarted) {
      startFadeOut();
    }
  });

  splashScreen.addEventListener('animationend', (e) => {
    if (e.animationName === 'fadeOut') {
      splashScreen.style.display = 'none';
      audio.pause();
      audio.currentTime = 0;
    }
  });

  setTimeout(() => {
    if (!fadeStarted && !audio.paused) {
      startFadeOut();
    }
  }, 8500);

  function startFadeOut() {
    fadeStarted = true;
    splashScreen.classList.add('fade-out');
    audio.pause();
    audio.currentTime = 0;
  }
});
