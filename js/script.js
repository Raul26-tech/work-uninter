const menuButton = document.getElementById('menuButton');
const navLinks = document.getElementById('navLinks');
const themeButton = document.getElementById('themeButton');
const currentYear = document.getElementById('currentYear');
const contactForm = document.getElementById('contactForm');

currentYear.textContent = new Date().getFullYear();

function closeMobileMenu() {
  navLinks.classList.remove('active');
  menuButton.setAttribute('aria-expanded', 'false');
}

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('active');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMobileMenu);
});

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-theme', isDark);
  themeButton.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('portfolio-theme', theme);
}

const savedTheme = localStorage.getItem('portfolio-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

themeButton.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
  applyTheme(nextTheme);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setError(fieldId, message) {
  document.getElementById(`${fieldId}Error`).textContent = message;
}

function clearErrors() {
  setError('name', '');
  setError('email', '');
  setError('message', '');
  document.getElementById('successMessage').textContent = '';
}

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  clearErrors();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  let hasError = false;

  if (!name) {
    setError('name', 'Informe seu nome.');
    hasError = true;
  }

  if (!email) {
    setError('email', 'Informe seu e-mail.');
    hasError = true;
  } else if (!isValidEmail(email)) {
    setError('email', 'Informe um e-mail válido. Exemplo: usuario@dominio.com');
    hasError = true;
  }

  if (!message) {
    setError('message', 'Digite uma mensagem.');
    hasError = true;
  }

  if (hasError) {
    return;
  }

  contactForm.reset();
  document.getElementById('successMessage').textContent = 'Mensagem enviada com sucesso!';
});
