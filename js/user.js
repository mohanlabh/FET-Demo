"use strict";
var emailArr = [];
var phoneArr = [];
function userCheck() {
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/users",
    dataType: "json",
    processData: false,
    contentType: "application/json",
    success: function (response) {
      var len = response.length;
      for (let index = 0; index < len; index++) {
        var email_data = response[index].email;
        var phone_data = response[index].phone;
        if (emailArr.includes(email_data) === false) {
          emailArr.push(email_data);
        }
        if (phoneArr.includes(phone_data) === false) {
          phoneArr.push(phone_data);
        }
      }
    },
    error: function (error) {
      alert(error);
    },
  });
}
userCheck();

function signUp() {
  var name = document.querySelector("#userName").value;
  var uemail = document.querySelector("#userEmail").value;
  var uphone = document.querySelector("#userPhone").value;
  var password = document.querySelector("#userPass").value;
  var object = {
    name: name,
    email: uemail,
    phone: uphone,
    password: password,
    userName: name,
    likedImagesIds: [],
  };
  event.preventDefault();

  if (uemail.length !== 0 && password.length !== 0 && uphone.length !== 0) {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/users",
      dataType: "json",
      contentType: "application/json",
      processData: false,
      success: function (response) {
        userCheck();
        var email_present = emailArr.some((email) => {
          return email === uemail;
        });
        var phone_present = phoneArr.some((phone) => {
          return phone === uphone;
        });
        if (email_present === false && phone_present === false) {
          $.ajax({
            type: "POST",
            url: " http://localhost:3000/users",
            data: JSON.stringify(object),
            dataType: "json",
            contentType: "application/json",
            success: function (response) {
              console.log("Registered successfully");
              alert("Registered successfully");
            },
            error: function (error) {
              alert(error);
            },
          });
        } else {
          if (email_present === true && phone_present === false) {
            alert(uemail + " is already registered with us");
          }
          if (phone_present === true && email_present === false) {
            alert(uphone + " is already registered with us");
          }
          if (email_present === true && phone_present === true) {
            alert(uphone + " & " + uemail + " is already registered with us");
          }
        }
      },
      error: function (error) {
        alert(error);
      },
    });
  } else {
    alert("please enter details to continue");
  }
}

function signIn() {
  event.preventDefault();
  var url = new URL("http://localhost:3000/users");
  var username = validateSignIn();
  var password = document.querySelector("#pass").value;
  var mailPattern = /^(^[A-Za-z0-9]+@+[A-Za-z]+.+([A-Za-z])$)$/;
  var phonePattern = /^([7-9]{1}[0-9]{9})$/;
  var emailMatch = mailPattern.test(username);
  var phoneMatch = phonePattern.test(username);
  if (emailMatch === true) {
    console.log("text entered is email");
    var uemail = username;
    url.searchParams.append("email", uemail);
    url.searchParams.append("password", password);
  }
  if (phoneMatch === true) {
    var uphone = username;
    url.searchParams.append("phone", uphone);
    url.searchParams.append("password", password);
  }
  if (phoneMatch === false && emailMatch === false) {
    return null;
  }
  if (emailphone.length !== 0 && password.length !== 0) {
    $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      processData: false,
      contentType: "application/json",
      success: function (response) {
        if (response.length != 0) {
          var userjson = JSON.stringify(response);
          sessionStorage.setItem("users", userjson);
          window.location.href = "../html/userDashboard.html";
        } else {
          userCheck();
          if (emailMatch === true) {
            if (
              emailArr.some((email) => {
                return email === uemail;
              }) === false
            ) {
              alert(
                uemail +
                  "  user email is not registered please register to log In."
              );
            } else {
              alert("wrong email or password");
            }
          }

          if (phoneMatch === true) {
            if (
              phoneArr.some((phone) => {
                return phone === uphone;
              }) === false
            ) {
              alert(
                uphone +
                  "  user phone number is not registered please register to log In."
              );
            } else {
              alert("wrong phone or password");
            }
          }
        }
      },
      error: function (error) {
        alert(error);
      },
    });
  } else {
    alert("no data entered ");
  }
}

function validateSignIn() {
  var emailphone = document.querySelector("#emailPhone").value;
  var mailPattern = /^(^[A-Za-z0-9]+@+[A-Za-z]+.+([A-Za-z])$)$/;
  var phonePattern = /^([7-9]{1}[0-9]{9})$/;
  var emailMatch = mailPattern.test(emailphone);
  var phoneMatch = phonePattern.test(emailphone);
  console.log(emailMatch);
  console.log(phoneMatch);
  if (emailMatch === true) {
    var email = emailphone;
    return email;
  }
  if (phoneMatch === true) {
    var phone = emailphone;
    return phone;
  }
  if (phoneMatch === false && emailMatch === false) {
    document
      .querySelector("#emailPhone")
      .setCustomValidity("enter proper email/mobile number");
  }
}

function signOut() {
  sessionStorage.removeItem("users");
  window.location.href = "../html/loginsignup.html";
}

function getusers() {
  var users = JSON.parse(sessionStorage.getItem("users")).find((x) => x.id);
  return users;
}

var user;
$("#image_btn").click(function (e) {
  e.preventDefault();
  if (user) {
    return;
  } else {
    var uId = getusers().id;
    var pname = document.querySelector("#pname");
    var pemail = document.querySelector("#pemail");
    var pphone = document.querySelector("#pphone");
    $.getJSON("http://localhost:3000/users", function (data) {
      user = data.find((u) => {
        return u.id === uId;
      });
      pname.value = user.name;
      pemail.value = user.email;
      pphone.value = user.phone;
    });
  }
});

var euser;
$("#editProfile_btn").click(function (e) {
  e.preventDefault();
  var cname = document.querySelector("#cname");
  var cemail = document.querySelector("#cemail");
  var cphone = document.querySelector("#cmobile");

  if (euser) {
    return;
  } else {
    var uId = getusers().id;
    $.getJSON("http://localhost:3000/users", function (data) {
      euser = data.find((u) => {
        return u.id === uId;
      });
      cname.value = euser.name;
      cemail.value = euser.email;
      cphone.value = euser.phone;
    });
  }
});

function editProfile() {
  event.preventDefault();
  var newName = $("#cname").val();
  var newPhone = $("#cmobile").val();
  var uId = getusers().id;

  userCheck();
  var phone_present = phoneArr.some((phone) => {
    return phone === newPhone;
  });

  var data = {
    name: newName,
    phone: newPhone,
  };

  if (phone_present === false) {
    $.ajax({
      type: "PATCH",
      url: "http://localhost:3000/users/" + uId,
      data: JSON.stringify(data),
      dataType: "json",
      contentType: "application/json",
      success: function (response) {
        var users = getusers();
        var data = [
          {
            name: newName,
            email: users.email,
            phone: newPhone,
            password: users.password,
            id: uId,
            userName: newName,
            likedImagesIds: getusers().likedImagesIds,
          },
        ];
        sessionStorage.setItem("users", JSON.stringify(data));
        alert("Data Updated successfully...");
      },
      error: function (error) {
        alert(error);
      },
    });
  } else {
    alert("This Phone Number is Already Exits...");
  }
}

function displayUser() {
  var users = getusers();
  document.querySelector("#navname").innerHTML = users.name;
  document.querySelector("#navemail").innerHTML = users.email;
  document.querySelector("#loggedUsername").innerHTML = users.name;
}

var passwordSignup = document.querySelector("#userPass");
var confirm_password = document.querySelector("#userPswd");

function validatePassword() {
  if (passwordSignup.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity("");
  }
}
passwordSignup.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;
