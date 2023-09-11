import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
let feedbackDataToLs = {};
const {
  elements: { email, message },
} = feedbackForm;

restoreUserInputs();

feedbackForm.addEventListener('input', throttle(saveFeedbackData, 500));
feedbackForm.addEventListener('submit', onSubmitForm);

function saveFeedbackData(e) {
  feedbackDataToLs[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackDataToLs));
}

function onSubmitForm(e) {
  if (email.value === '' || message.value === '') {
    return alert('Заповніть будь ласка усі поля');
  }
  e.preventDefault();
  e.currentTarget.reset();
  console.log(feedbackDataToLs);
  feedbackDataToLs = {};
  localStorage.removeItem(STORAGE_KEY);
}

function restoreUserInputs() {
  const savedFeedback = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedFeedback) {
    message.value = savedFeedback.message || '';
    email.value = savedFeedback.email || '';
    feedbackDataToLs[email.name] = savedFeedback.email || '';
    feedbackDataToLs[message.name] = savedFeedback.message || '';
  }
}
