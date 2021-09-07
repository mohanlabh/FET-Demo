$(document).ready(function () {
  $("#filter").on("change paste keyup", function () {
    if ($(this).val().length > 0) {
      $(".col").hide();
      var mySelector = $(this).val();
      var myImgs = $("[class*='" + mySelector + "' i]");
      myImgs.show();
    } else {
      $(".col").show();
    }
  });
});
