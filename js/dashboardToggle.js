$(() => {
  $(
    "#post_btn, #activitylog_btn, #uploadImg_btn, #editProfile_btn, #dashboard_btn, #image_btn"
  ).click(() => {
    $("#sidebar").toggleClass("active");
  });
  $(".posts, .activitylog, .uploadImg, .editprofile, .profilepage").hide();
  $("#dashboard_btn").click(() => {
    $(".dashboard").showDashboard();
  });
  $("#post_btn").click(() => {
    $(".posts").showPosts();
  });
  $("#activitylog_btn").click(() => {
    $("activitylog").showactivityLog();
  });
  $("#editProfile_btn").click(() => {
    $(".editprofile").showeditProfile();
  });
  $("#uploadImg_btn").click(() => {
    $(".uploadImg").showUploadImg();
  });

  $("#image_btn").click(() => {
    $(".profilepage").showProfilePage();
  });

  $.fn.showDashboard = function () {
    $(".posts, .activitylog, .uploadImg, .editprofile,.profilepage").hide();
    $(".dashboard").show();
  };
  $.fn.showPosts = function () {
    $(
      ".dashboard , .activitylog, .uploadImg, .editprofile,.profilepage"
    ).hide();
    $(" .posts").show();
  };
  $.fn.showUploadImg = function () {
    $(".dashboard , .activitylog,  .editprofile,  .posts,.profilepage").hide();
    $(".uploadImg").show();
  };
  $.fn.showactivityLog = function () {
    $(".dashboard , .posts , .uploadImg, .editprofile,.profilepage").hide();
    $(" .activitylog").show();
  };
  $.fn.showeditProfile = function () {
    $(" .posts, .dashboard , .activitylog, .uploadImg,.profilepage").hide();
    $(" .editprofile").show();
  };
});

$.fn.showProfilePage = function () {
  $(".posts, .activitylog, .uploadImg, .editprofile, .dashboard").hide();
  $(".profilepage").show();
};
