$(document).ready(() => {
  function getusers() {
    var users = JSON.parse(sessionStorage.getItem("users")).find((x) => x.id);
    return users;
  }

  var uId = getusers().id;
  console.log(uId);
  let post_container = $(".post-galary-wrapper  .post-galary-elements");
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/uploadedImg?uploadedBy=" + uId,
    contentType: "application/json",
    success: function (result) {
      let elemArr = JSON.parse(JSON.stringify(result));

      elemArr.forEach((element) => {
        let elemData = element.data;
        let serachKeys = " " + element.category + " " + element.hashtag;
        post_container.append(
          '<div class="col  hovereffects' +
            serachKeys +
            '"><img src="' +
            elemData +
            '" class="post-items" alt="post"></div>'
        );
      });
    },
    error: function (error) {
     
    },
  });
});
