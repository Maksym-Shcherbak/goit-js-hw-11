// Get a reference to the .back-to-top element
const backToTop = document.querySelector('.back-to-top');

// Add a scroll event listener to the window
export default window.addEventListener('scroll', () => {
  if (window.scrollY > 800) {
    // Add the "show-back-to-top" class
    backToTop.classList.add('show-back-to-top');
  } else {
    // Remove the "show-back-to-top" class
    backToTop.classList.remove('show-back-to-top');
  }
});
