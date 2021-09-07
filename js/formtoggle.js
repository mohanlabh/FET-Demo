function toggleForm() {
  const container = document.querySelector(".container");
  container.classList.toggle("active");
}
function signupForm() {
  window.location.href = "../html/loginsignup.html#load-stuff";
}

function signupToggle() {
  if (window.location.hash === "#load-stuff") {
    toggleForm();
  }
}
