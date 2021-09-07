$(document).ready(function () {
  $("#filter").on("change paste keyup", function () {
    if ($(this).val().length > 0) {
      $(".col").hide();
      var mySelector = $(this).val();
      console.log("Search==>", mySelector);
      var myImgs = $("[class*='" + mySelector + "' i]");
      console.log("image object===>", myImgs);
      myImgs.show();
    } else {
      $(".col").show();
    }
  });
});
