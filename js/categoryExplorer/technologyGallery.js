$(document).ready(() => {
  let loggedInUser;

  if (JSON.parse(sessionStorage.getItem("users")) !== null) {
    loggedInUser = JSON.parse(sessionStorage.getItem("users"))[0];
  }

  let technology_container = $(
    ".technology-galary-wrapper  .technology-galary-elements"
  );

  $.ajax({
    type: "GET",
    url: "http://localhost:3000/uploadedImg?category=technology",
    contentType: "application/json",
    success: function (result) {
      console.log(result);

      let elemArr = JSON.parse(JSON.stringify(result));

      elemArr.forEach((element) => {
        let elemData = element.data;
        let serachKeys = " " + element.category + " " + element.hashtag;
        if (loggedInUser) {
          technology_container.append(
            `<div class="col hovereffect` +
              serachKeys +
              `"><img src="` +
              elemData +
              `" class="gallery-item" alt="gallery">` +
              `<div class="lik-btn">
                    <button id="` +
              element.id +
              `" class="likeBtn">Like</button>
                    <a href="` +
              element.data +
              `" download>
                    <button id="` +
              element.id +
              `" class="downloadBtn"><i class="fa fa-download"></i></button>
                    </a>
                    <button type="button" class="commentButton commentBtn" data-bs-toggle="modal" data-bs-target="#myModal" data-bs-whatever="comments" id="` +
              element.id +
              `"><i class="fa fa-comment"></i></button>
                </div>` +
              `</div>`
          );
        } else {
          technology_container.append(
            `<div class="col hovereffect` +
              serachKeys +
              `"><img src="` +
              elemData +
              `" class="gallery-item" alt="gallery">` +
              `<div class="lik-btn">
                    <button id="` +
              element.id +
              `" class="likeBtn">Like</button>
                    <button type="button" class="commentButton commentBtn" data-bs-toggle="modal" data-bs-target="#myModal" data-bs-whatever="comments" id="` +
              element.id +
              `"><i class="fa fa-comment"></i></button>
                </div>` +
              `</div>`
          );
        }
      });
    },
    error: function (error) {
      alert("error occured during fetching the record");
    },
  });
});
