var str;

function getusers() {
  var users = JSON.parse(sessionStorage.getItem("users")).find((x) => x.id);
  return users;
}

$("#activitylog_btn").click(() => {
  if (str) {
    return;
  } else {
    var uId = getusers().id;
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/uploadedImg?uploadedBy=" + uId,
      dataType: "json",
      contentType: "application/json",
      processData: false,
      success: function (response) {
        var len = response.length;
        for (let index = 0; index < len; index++) {
          var imageId = response[index].id;
          var caption = response[index].caption;
          var categories = response[index].category;
          var tags = response[index].hashtag;
          var imgdate = response[index].date;
          var likes = response[index].likesCount;

          for (let i = 0; i < response[index].comments.length; i++) {
            var author = response[index].comments[i].username;
            var comment = response[index].comments[i].comment;
            var date = response[index].comments[i].comment_time;

            str =
              `<tr>
                <th scope="row" class="title">` +
              imageId +
              `</th>
                <td class="caption">` +
              caption +
              `</td>
                <td class="author">` +
              author +
              `</td>
                <td class="categories">` +
              categories +
              `</td>
                <td class="tags">` +
              tags +
              `</td>
                <td class="imgdate">` +
              imgdate +
              `</td>
                <td class="comment">` +
              comment +
              `</td>
                <td class="date">` +
              date +
              `</td>
                <td class="likes">` +
              likes +
              `</td>
              </tr>`;
            $("tbody").append(str);
          }
        }
      },
      error: function (error) {
        
      },
    });
  }
});

function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[3];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
