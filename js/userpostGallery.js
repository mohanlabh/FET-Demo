$(document).ready(() => {
  function getusers() {
    var users = JSON.parse(sessionStorage.getItem("users")).find((x) => x.id);
    return users;
  }

  var uId = getusers().id;
  const post_container = $(".post-galary-wrapper  .post-galary-elements");
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/uploadedImg?uploadedBy=" + uId,
    contentType: "application/json",
    success: function (result) {
      const elemArr = JSON.parse(JSON.stringify(result));

      elemArr.forEach((element) => {
        const elemData = element.data;
        const serachKeys = " " + element.category + " " + element.hashtag;
        post_container.append(
          '<div class="col  hovereffects' +
            serachKeys +
            '"><img src="' +
            elemData +
            '" class="post-items" alt="post"></div>'
        );
      });
    }
  });
});
