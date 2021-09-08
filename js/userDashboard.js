$(function () {
  $("#NavMenuBar").on("click", function () {
    $("#sidebar").toggleClass("active");
  });
});

function displayDayTime() {
  var currentHour = new Date().getHours();
  var outputElement = document.querySelector("#dayWish");
  var imgElement = document.querySelector("#imgDayWish");
  document.querySelector("#dateTime").innerHTML += "It's " + new Date();
  if (currentHour >= 5 && currentHour < 12) {
    outputElement.innerHTML = " Good Morning";
    imgElement.innerHTML +=
      "<img src='../img/htmlimages/morning.png' class='daywishes rounded mx-auto d-block'  style='width: 400px; height: 280px;' ></img>";
  } else if (currentHour >= 12 && currentHour < 16) {
    outputElement.innerHTML = " Good Afternoon";
    imgElement.innerHTML +=
      "<img src='../img/htmlimages/afternoon.png' class='daywishes rounded mx-auto d-block'  style='width: 400px; height: 280px;' ></img>";
  } else if (currentHour >= 16 && currentHour < 21) {
    outputElement.innerHTML = " Good Evening";
    imgElement.innerHTML +=
      "<img src='../img/htmlimages/sunset.png' class='daywishes rounded mx-auto d-block'  style='width: 400px; height: 280px;' ></img>";
  } else {
    outputElement.innerHTML = " Good Night";
    imgElement.innerHTML +=
      "<img src='../img/htmlimages/night.png' class='daywishes rounded mx-auto d-block'  style='width: 400px; height: 280px;' ></img>";
  }
}
