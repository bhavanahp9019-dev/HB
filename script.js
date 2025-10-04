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

  // ------------------ Floating Hearts ------------------
  const heartsContainer = document.getElementById('hearts-container');
  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '💖';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.fontSize = (1 + Math.random() * 2) + 'em';
    heart.style.animationDuration = (3 + Math.random() * 3) + 's';
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  }
  setInterval(createHeart, 400);

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

  memoryLinks.forEach(link => {
    link.addEventListener('click', () => {
      song.currentTime = 0;
      song.play();

      clearInterval(autoNextInterval);

      setTimeout(() => {
        autoNextInterval = setInterval(() => {
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
      clearInterval(autoNextInterval);
    }
  });

});

