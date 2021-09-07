$(document).ready(() => {
  let dropArea = $("#upload-drag-area");
  let input = $("#fileElem");
  let resetInput = $("#upload-reset");
  let dashboardUploadImgBtn = $("#uploadImg_btn");

  input.on("change", function () {
    file = this.files[0];
    dropArea.addClass("active");
    showFile();
  });

  $(document).on("change", "#fileElemOnFly", function () {
    file = this.files[0];
    dropArea.addClass("active");
    showFile();
  });

  resetInput.on("click", () => {
    input.val(null);
    let htmlStr = `                       
    <div class="icon"><i class="fas fa-cloud-upload-alt"></i></div>
  
    <header id="upload-header ">Drag & Drop Image File</header>
    
    <span>OR</span>
  
    <input type="file" class="visually-hidden upload-data" id="fileElemOnFly" required>
    
    <label for="fileElemOnFly">Browse</label>`;

    dropArea.html(htmlStr);

    dashboardUploadImgBtn.trigger("dblclick");
  });

  dropArea.on("dragover", (event) => {
    event.preventDefault();
    dropArea.addClass("active");
  });

  dropArea.on("dragleave", () => {
    dropArea.removeClass("active");
  });

  dropArea.on("drop", (event) => {
    event.preventDefault();
    file = event.originalEvent.dataTransfer.files[0];
    showFile();
  });

  function showFile() {
    let fileType = file.type;
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if (validExtensions.includes(fileType)) {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        let fileURL = fileReader.result;

        let imgTag = `<img src="${fileURL}" alt="image" class="img-fluid upload-data" id="uploadedImg">`;
        dropArea.html(imgTag);
      };

      fileReader.readAsDataURL(file);
    } else {
      alert("This is not an Image File!");
      input.val(null);
      $("#fileElemOnFly").val(null);

      dropArea.removeClass("active");
    }
  }
});

$("#upload-form").submit(function (event) {
  event.preventDefault();

  let uplaodImage = $("#uploadedImg").attr("src");
  let category = $("#categorySelect").val();
  let caption = $("#captionSelect").val();
  let hashTag = $("#hashtagSelect").val();
  let date = new Date();
  let latestDate =
    date.getDate() + "/" + date.getMonth() + "/" + date.getUTCFullYear();
  let latestTime =
    date.getHours() + "/" + date.getMinutes() + "/" + date.getSeconds();

  function getusers() {
    var users = JSON.parse(sessionStorage.getItem("users")).find((x) => x.id);
    return users;
  }

  let data = {
    data: uplaodImage,
    category: category,
    caption: caption,
    hashtag: hashTag,
    date: latestDate,
    time: latestTime,
    comments: [],
    likesCount: 0,
    uploadedBy: getusers().id,
  };

  $.ajax({
    type: "POST",
    url: "  http://localhost:3000/uploadedImg",
    data: JSON.stringify(data),
    dataType: "json",
    contentType: "application/json",
    success: function (response) {
      alert("Image uploaded successfully");
    },
    error: function (error) {
      alert(error);
    },
  });
});
