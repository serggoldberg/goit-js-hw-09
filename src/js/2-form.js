const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const textarea = form.querySelector('textarea');
const emailInput = form.elements.email;
const submitButton = form.querySelector('button[type="submit"]');
window.addEventListener('load', () => {
  const jsn = localStorage.getItem(STORAGE_KEY) ?? '';
  try {
    const data = JSON.parse(jsn);
    form.elements.email.value = data.email;
    textarea.value = data.message;
  } catch {
    console.log('No saved data!');
  }
});
function saveFormData() {
  const email = emailInput.value.trim();
  const message = textarea.value.trim();
  const data = JSON.stringify({ email, message });
  localStorage.setItem(STORAGE_KEY, data);
}
emailInput.addEventListener('input', saveFormData);
textarea.addEventListener('input', saveFormData);
form.addEventListener('submit', function (event) {
  event.preventDefault();
  if (emailInput.value.trim() === '' || textarea.value.trim() === '') {
    return alert('fill in all fields');
  }
  saveFormData();
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
});