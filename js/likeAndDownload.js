$(document).ready(function () {
  let loggedInUser;
  if (JSON.parse(sessionStorage.getItem("users")) !== null)
    loggedInUser = JSON.parse(sessionStorage.getItem("users"))[0];

  let currUser = [];
  let allLikeBtns = [];
  let userLikedImagesIds = [];

  startFn();

  function startFn() {
    allLikeBtns = document.getElementsByClassName("likeBtn");
    allDownloadBtns = document.getElementsByClassName("downloadBtn");
    if (loggedInUser) {
      $.ajax({
        type: "GET",
        url: "http://localhost:3000/db",
        dataType: "json",
        contentType: "application/json",
        success: (response) => {
          currUser = response.users.filter((u) => {
            return u.userName === loggedInUser.userName;
          });

          userLikedImagesIds = currUser[0].likedImagesIds;

          for (let i = 0; i < allLikeBtns.length; i++) {
            var liked = false;
            for (let j = 0; j < userLikedImagesIds.length; j++) {
              if (userLikedImagesIds[j] === allLikeBtns[i].id) {
                liked = true;
                document.getElementById(allLikeBtns[i].id).style.color = "red";
                document.getElementById(allLikeBtns[i].id).innerHTML =
                  "Liked" + " " + response.uploadedImg[i].likesCount;
              } else {
              }
            }
            if (liked == false) {
              document.getElementById(allLikeBtns[i].id).innerHTML =
                "Like" + " " + response.uploadedImg[i].likesCount;
            }
          }
        },
        error: (error) => {
          alert(error);
        },
      });
    }
  }

  function updateLikeStatus(e, action) {
    let imgId = parseInt(e.target.id);
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/users/" + parseInt(loggedInUser.id),
      dataType: "json",
      contentType: "application/json",
      processData: false,
      success: (response) => {
        if (action === "like") {
          response.likedImagesIds.push(imgId);
        } else if (action === "unlike") {
          response.likedImagesIds = response.likedImagesIds.filter(
            (x) => x !== imgId
          );
        }

        let data1 = response;
        $.ajax({
          type: "PUT",
          url: "http://localhost:3000/users/" + parseInt(loggedInUser.id),
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify(data1),
          success: (response) => {
            if (action === "like") {
              updateLikeCount(imgId, "increment");
            } else {
              updateLikeCount(imgId, "decrement");
            }
          },
          error: (error) => {
            alert(error);
          },
        });
      },
      error: (error) => {
        alert(error);
      },
    });
  }

  $(document).on("click", ".likeBtn", (e) => {
    if (loggedInUser) {
      if ($("#" + e.target.id).css("color") === "rgb(255, 0, 0)") {
        $("#" + e.target.id).css("color", "black");

        currentBtnId = parseInt(e.target.id);

        updateLikeStatus(e, "unlike");
      } else {
        $("#" + e.target.id).css("color", "red");

        loggedInUser.likedImagesIds.push(parseInt(e.target.id));
        updateLikeStatus(e, "like");
      }
    } else {
      alert("Plesase Login to like the images!!");
    }
  });

  function updateLikeCount(imgId, action) {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/uploadedImg/" + imgId,
      dataType: "json",
      contentType: "application/json",

      success: (response) => {
        if (action === "increment") {
          response.likesCount = response.likesCount + 1;
        } else if (action === "decrement") {
          response.likesCount = response.likesCount - 1;
        }

        parseInt(response.likesCount);

        let data1 = response;
        $.ajax({
          type: "PATCH",
          url: "http://localhost:3000/uploadedImg/" + imgId,
          dataType: "json",
          contentType: "application/json",

          data: JSON.stringify(data1),
          success: (response) => {},
          error: (error) => {
            alert(error);
          },
        });
      },
      error: (error) => {
        alert(error);
      },
    });
  }

  $(".downloadBtn").click((e) => {
    if (loggedInUser) {
      imgId = parseInt(e.target.id);
      downloadImg(e);
    } else {
      alert("Please Login to download images!! ");
    }
  });

  function downloadImg(e) {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/uploadedImg/" + parseInt(e.target.id),
      dataType: "json",
      contentType: "application/json",
      success: (response) => {
        console.log("img obj->", response);
        $("#" + e.target.id).attr("href", response.data);
        var href = $("#" + e.target.id).attr("href");
        alert(href);
      },
      error: (error) => {
        alert(error);
      },
    });
  }
});
