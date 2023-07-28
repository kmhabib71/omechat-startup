window.addEventListener("unload", function (event) {
  $.ajax({
    url: "/leaving-user-update/" + username + "",
    type: "PUT",
    success: function (response) {
      console.log(response);
    },
  });
});
$.ajax({
  url: "/leaving-user-update/" + username + "",
  type: "PUT",
  success: function (response) {
    console.log(response);
  },
});
