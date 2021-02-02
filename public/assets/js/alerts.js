$(document).ready(() => {
  const colorAlertRows = () => {
    const alertRows = $(".alert");

    for (let i = 0; i < alertRows.length; i++) {
      const approvedRate = $($(alertRows[i]).children("td")[2]).children(
        "input"
      )[0].value;
      const currentRate = $(
        $(alertRows[i]).children(".current-price")[0]
      ).children("input")[0].value;

      if (approvedRate > currentRate) {
        $(alertRows[i]).addClass("buy");
      }
    }
  };

  // Update an alert
  $(".update").on("click", function (event) {
    event.preventDefault();

    const updateBtn = $(this);
    const $changeableInput = $($($(this).parent().siblings()[1]).children()[0]);

    const id = $(this).data("id");

    if (updateBtn.hasClass("save")) {
      updateBtn.removeClass("save");
      updateBtn.text("Update");

      $changeableInput.attr("readonly", true);
      $changeableInput.removeClass("writeable");

      const alertPriceInput = $changeableInput.val();

      const updatedAlert = {
        price: parseFloat(
          alertPriceInput.substring(1, alertPriceInput.length)
        ).toFixed(2),
      };

      $.ajax({
        method: "PUT",
        url: `/api/alerts/${id}`,
        data: updatedAlert,
      }).then(() => {
        location.reload();
      });
    } else {
      updateBtn.addClass("save");
      updateBtn.text("Save");

      $changeableInput.attr("readonly", false);
      $changeableInput.addClass("writeable");
    }
  });

  // Delete an alert
  $(".delete").on("click", function () {
    const id = $(this).data("id");

    $.ajax({
      method: "DELETE",
      url: `/api/alerts/${id}`,
    }).then(() => {
      console.log("Deleted sucessfully!");
      location.reload("/alerts");
    });
  });

  colorAlertRows();
});
