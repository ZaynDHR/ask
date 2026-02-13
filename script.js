'use strict';

// DOM Elements
const noBtn = document.querySelector('.btn--no');
const yesBtn = document.querySelector('.btn--yes');

// Configuration
const config = {
  maxOffsetX: 600,
  maxOffsetY: 500,
  moveDelay: 0,
};

// Move the "No" button to a random position
function moveNoButton() {
  const offsetX = (Math.random() - 0.5) * config.maxOffsetX * 2;
  const offsetY = (Math.random() - 0.5) * config.maxOffsetY * 2;
  
  // Ensure button stays within viewport
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const buttonRect = noBtn.getBoundingClientRect();
  
  const constrainedX = Math.max(
    -buttonRect.left,
    Math.min(offsetX, viewportWidth - buttonRect.right)
  );
  const constrainedY = Math.max(
    -buttonRect.top,
    Math.min(offsetY, viewportHeight - buttonRect.bottom)
  );
  
  noBtn.style.transform = `translate(${constrainedX}px, ${constrainedY}px)`;
}

// Show response when clicking "Yes"
function showResponse() {
  window.location.href = 'success.html';
}

// Event listeners
if (noBtn && yesBtn) {
  // Desktop: Move on hover
  noBtn.addEventListener('mouseover', moveNoButton);
  
  // Mobile: Move on touchstart
  noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
  }, { passive: false });
  
  // Yes button click
  yesBtn.addEventListener('click', showResponse);
  
  // Keyboard support
  yesBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      showResponse();
    }
  });
  
  // Reset button position on resize
  window.addEventListener('resize', () => {
    noBtn.style.transform = 'translate(0, 0)';
  });
} else {
  console.warn('Required DOM elements not found');
}
