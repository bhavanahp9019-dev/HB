document.addEventListener("DOMContentLoaded", function(){

  // ------------------ Modal Logic ------------------
  const modal = document.getElementById('surpriseModal');
  const content = document.getElementById('modalContent');
  const seeBtn = document.getElementById('seeBtn');
  const exitBtn = document.getElementById('exitBtn');

  seeBtn.addEventListener('click', () => modal.style.display = 'none');
  exitBtn.addEventListener('click', () => {
    content.innerHTML = `
      <p>💖 I made this with so much love…</p>
      <p>Please watch at least once ❤️</p>
      <button id="continueBtn">Continue</button>
    `;
    document.getElementById('continueBtn').addEventListener('click', () => modal.style.display = 'none');
  });

  // ------------------ Typing Effect ------------------
  const h1Text = "✨ Happy Birthday! ✨";
  const h1El = document.getElementById('typing-text');
  let i = 0;

  function typeH1() {
    if (i < h1Text.length) {
      h1El.innerHTML += h1Text.charAt(i);
      i++;
      setTimeout(typeH1, 100);
    } else {
      const paragraphs = document.querySelectorAll('.hero p[data-text]');
      typeWriterMulti(paragraphs);
    }
  }

  function typeWriterMulti(elements, index = 0, charIndex = 0) {
    if (index >= elements.length) return;
    const el = elements[index];
    const text = el.getAttribute('data-text');
    if (charIndex < text.length) {
      el.innerHTML += text.charAt(charIndex);
      setTimeout(() => typeWriterMulti(elements, index, charIndex + 1), 50);
    } else {
      setTimeout(() => typeWriterMulti(elements, index + 1, 0), 300);
    }
  }

  typeH1();

  // ------------------ Floating Hearts (with cap) ------------------
  const heartsContainer = document.getElementById('hearts-container');

  // Max number of hearts allowed at once to avoid DOM/perf blowup
  const MAX_HEARTS = 50;

  function createHeart() {
    // If too many hearts are present, skip creating a new one (throttling)
    if (heartsContainer.childElementCount >= MAX_HEARTS) return;

    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '💖';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.fontSize = (1 + Math.random() * 2) + 'em';
    heart.style.animationDuration = (3 + Math.random() * 3) + 's';
    heartsContainer.appendChild(heart);

    // Remove after the animation time + a small buffer
    setTimeout(() => {
      if (heart && heart.parentNode) heart.parentNode.removeChild(heart);
    }, 6500);
  }

  // Slightly slower interval (400ms is fine; keep original feel)
  const heartsInterval = setInterval(createHeart, 400);

  // Optional: when page visibility changes, pause heavy effects
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(heartsInterval);
    } else {
      // restart the interval if needed (create a new one)
      // Note: this keeps the same MAX_HEARTS cap
      setInterval(createHeart, 400);
    }
  });

  // ------------------ Cute Video Play Button ------------------
  const videoTypingText = document.getElementById('videoTypingText');
  const videoContainer = document.querySelector('.video-container');
  const playVideoBtn = document.getElementById('playVideoBtn');
  const video = document.getElementById('cuteVideo');

  const happyText = "✨ Happy Birthday! ✨";

  // Typing effect for video section
  let idx = 0;
  function typeVideoText() {
    if (idx < happyText.length) {
      videoTypingText.innerHTML += happyText.charAt(idx);
      idx++;
      setTimeout(typeVideoText, 100);
    } else {
      playVideoBtn.style.display = "inline-block"; // show button after typing
    }
  }

  typeVideoText(); // start typing on page load

  // Play video on button click
  playVideoBtn.addEventListener('click', () => {
    videoContainer.style.display = "block"; // show video
    video.currentTime = 0;
    video.play();
    video.scrollIntoView({behavior: 'smooth', block: 'center'});
    playVideoBtn.style.display = "none"; // hide button after click
  });

  // ------------------ Single Song & Auto Slideshow ------------------
  const song = document.getElementById('song1');
  const memoryLinks = document.querySelectorAll('[data-lightbox="birthday"]');
  let autoNextInterval = null;
  let autoNextIntervalId = null;

  memoryLinks.forEach(link => {
    link.addEventListener('click', () => {
      song.currentTime = 0;
      song.play();

      if (autoNextIntervalId) {
        clearInterval(autoNextIntervalId);
        autoNextIntervalId = null;
      }

      setTimeout(() => {
        autoNextIntervalId = setInterval(() => {
          const nextBtn = document.querySelector('.lb-next');
          if (nextBtn) nextBtn.click();
        }, 5000); // 5 seconds
      }, 500);
    });
  });

  lightbox.option({
    'onEnd': function() {
      song.pause();
      song.currentTime = 0;
      if (autoNextIntervalId) {
        clearInterval(autoNextIntervalId);
        autoNextIntervalId = null;
      }
    }
  });

});
