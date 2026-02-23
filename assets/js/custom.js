/* ==========================================================================
   Custom JS: Dark Mode + Easter Egg Modal
   ========================================================================== */

(function () {
  'use strict';

  /* -------------------------------------------------------------------------
     Dark Mode
  -------------------------------------------------------------------------- */
  var THEME_KEY = 'theme';
  var toggleBtn = document.getElementById('dark-mode-toggle');

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (toggleBtn) {
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        toggleBtn.setAttribute('title', 'Switch to light mode');
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (toggleBtn) {
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        toggleBtn.setAttribute('title', 'Switch to dark mode');
      }
    }
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }

  // Apply saved theme on load (also done in <head> to prevent flash)
  var savedTheme = localStorage.getItem(THEME_KEY) || 'light';
  applyTheme(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
  }

  /* -------------------------------------------------------------------------
     Easter Egg Modal
  -------------------------------------------------------------------------- */
  var eggBtn   = document.getElementById('fun-easter-egg');
  var modal    = document.getElementById('fun-modal');
  var closeBtn = document.getElementById('fun-modal-close');

  function openModal() {
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      // Trap focus on close button
      if (closeBtn) closeBtn.focus();
    }
  }

  function closeModal() {
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      if (eggBtn) eggBtn.focus();
    }
  }

  if (eggBtn) {
    eggBtn.addEventListener('click', openModal);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close on overlay click (outside the modal card)
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.style.display !== 'none') {
      closeModal();
    }
  });

})();
