document.addEventListener("click", function (e) {
  if (e.target.classList.contains("gallery-item")) {
    const src = e.target.getAttribute("src");
    document.querySelector(".model-img").src = src;
    const myModal = new bootstrap.Modal(
      document.getElementById("gallery-model")
    );
    myModal.show();
  }
});

function goBack() {
  window.history.back();
}

function returnToPage() {
  if (sessionStorage.getItem("users") !== null) {
    window.location.href = "../html/userDashboard.html";
  } else {
    window.location.href = "../html/home.html";
  }
}

function logOff() {
  if (sessionStorage.getItem("users") !== null) {
    document.querySelector("#logOff").innerHTML +=
      " <input type='button' value='signout' class='btn btn-outline-dark btn-lg banner-button' onclick='signOut()'>";
  } else {
    document.querySelector("#logOff").innerHTML +=
      "<input type='button' value='sign In' class='btn btn-outline-dark btn-lg banner-button' onclick='redirectSignIn()'>";
  }
}

function redirectSignIn() {
  window.location.href = "../html/loginsignup.html";
}
