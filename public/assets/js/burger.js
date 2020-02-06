$(function() {
  $(".devour").on("click", function(event) {
    var id = $(this).data("id");
    console.log(id);
    var newBurgerState = {
      devoured: true
    };

    $.ajax("/api/burger/" + id, {
      type: "PUT",
      data: newBurgerState
    }).then(
      function() {
        console.log("changed Devour to true");
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    event.preventDefault();
    var newBurger = {
      name: $("#ca").val().trim(),
    };

    $.ajax("/api/burger", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new Burger");
        location.reload();
      }
    );
  });

  $(".delete-burger").on("click", function(event) {
    var id = $(this).data("id");
    console.log("Delete button clicked on id: "+id);
    $.ajax("/api/burger/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted burger", id);
        location.reload();
      }
    );
  });
});
