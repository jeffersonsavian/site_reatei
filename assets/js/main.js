/**
 * main.js — Scripts gerais do site
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── Menu mobile (se houver) ──────────────────────────────
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu    = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('nav--open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // ── Marca link ativo no menu ─────────────────────────────
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('nav a').forEach(link => {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, '') || '/';
    if (linkPath === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // ── Smooth scroll para âncoras ───────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
