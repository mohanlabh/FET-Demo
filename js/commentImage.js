function createHtml(username, now, comment) {
  var html =
    `<hr/>
  <div class="container comment-container">
      <div class="row ">
        <div class="col-2">
              <img
              src="../img/profile.jpg"
              class="mr-3 rounded-circle img-thumbnail shadow-sm float-left"
              width="50"
              height="50"
              alt="..."
              id="image"
          />
        </div>
        <div class="col-10">
            <div class="row"><div class="col">` +
    username +
    `</div></div>
            <div class="row"><div class="col">` +
    now +
    `</div></div>
            <div class="row"><div class="col">` +
    comment +
    `</div></div>
        </div>
      </div>
    </div>
    <hr/>
    `;

  return html;
}

function insertHtml(totalHtml) {
  $("#comments-container").html(totalHtml);
}

function prependHtml(username, now, comment) {
  var html =
    `<hr/>
<div class="container">
    <div class="row ">
      <div class="col-2">
            <img
            src="../img/profile.jpg"
            class="mr-3 rounded-circle img-thumbnail shadow-sm float-left"
            width="50"
            height="50"
            alt="..."
            id="image"
        />
      </div>
      <div class="col-10">
          <div class="row"><div class="col">` +
    username +
    `</div></div>
          <div class="row"><div class="col">` +
    now +
    `</div></div>
          <div class="row"><div class="col comment-box">` +
    comment +
    `</div></div>
      </div>
    </div>
  </div>
  <hr/>
  `;

  $("#comments-container").prepend(html);
}

function getusers() {
  var users = JSON.parse(sessionStorage.getItem("users")).find((x) => x.id);
  return users;
}

$(document).ready(() => {
  var comments = [];
  var gotJsonResult;
  var sessionStorage_username = "";
  var current_comment_button_id = "";
  let baseUrl = "http://127.0.0.1:5500";
  var url = new URL("/html/loginsignup.html", baseUrl);

  var myModal = document.getElementById("myModal");

  myModal.addEventListener("show.bs.modal", function (event) {
    current_comment_button_id = event.relatedTarget.id;

    var button = event.relatedTarget;

    var recipient = button.getAttribute("data-bs-whatever");

    var modalTitle = myModal.querySelector(".modal-title");
    var modalBodyInput = myModal.querySelector(".modal-body input");

    modalTitle.textContent = "Comments";
    modalBodyInput.value = recipient;

    $.ajax({
      type: "GET",
      url: "http://localhost:3000/uploadedImg/" + current_comment_button_id,
      contentType: "application/json",
      success: function (result) {
        gotJsonResult = result;

        let elemArr = JSON.parse(JSON.stringify(result));
        comments = elemArr.comments;

        let totalHtmlToAppend = "";

        for (let i = comments.length - 1; i >= 0; i--) {
          let username_txt = comments[i].username;
          let comment_txt = comments[i].comment;
          let comment_time_txt = comments[i].comment_time;
          totalHtmlToAppend += createHtml(
            username_txt,
            comment_time_txt,
            comment_txt
          );
        }

        insertHtml(totalHtmlToAppend);
      }
    });
  });

  $("#addComment").click(function (event) {
    if (!sessionStorage.users) {
      alert("Please login before entering comments");
      location.replace(url);
      return false;
    } else {
      sessionStorage_username = getusers().name;
    }

    let comment = $("#comment-message-text").val();
    let date = new Date();
    let hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
    let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    let seconds = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();

    let currentDate =
      date.getDate() + "/" + date.getMonth() + "/" + date.getUTCFullYear();
    let currentTime = hours + ":" + minutes + ":" + seconds;

    let now = currentDate + " " + currentTime;

    var addObj = {
      username: sessionStorage_username,
      comment: comment,
      comment_time: now,
    };

    gotJsonResult.comments.push(addObj);

    delete gotJsonResult["id"];

    var putData = JSON.parse(JSON.stringify(gotJsonResult));

    $.ajax({
      type: "PUT",
      url: "http://localhost:3000/uploadedImg/" + current_comment_button_id,
      contentType: "application/json",
      data: JSON.stringify(putData),
      success: function (result) {
        comments.push(addObj);

        prependHtml(sessionStorage_username, now, comment);
      }
    });
  });
});
