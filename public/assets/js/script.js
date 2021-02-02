$(document).ready(() => {
  // Post an alert to the database
  $("#alert-form").on("submit", (event) => {
    event.preventDefault();

    const metalInput = $("#metal").val().trim().toLowerCase();
    const priceInput = parseFloat($("#price").val().trim()).toFixed(2);

    // Won't submit the alert if we are missing a client, metal or price
    if (!metalInput || !priceInput) {
      alert(
        "Please check that you've filled out all required fields correctly."
      );
      return;
    }

    if (
      metalInput !== "gold" &&
      metalInput !== "silver" &&
      metalInput !== "platinum" &&
      metalInput !== "palladium" &&
      metalInput !== "rhodium"
    ) {
      alert("We could not set an alert for that metal. Please try again.");
      return;
    }

    const newAlert = {
      metal: metalInput,
      price: priceInput,
    };

    $("#metal").val("");
    $("#price").val("");

    // Send the POST request.
    $.post("/api/alerts", newAlert).then(() => {
      // Reload the page to get the updated list
      location.reload();
    });
  });

  // Everytime the page loads, aka the user opens the web page, the application runs through the database, comparing prices of Metals and prices in Alerts and alerts the user if their chosen metal has fallen below their chosen price.
  const alertUser = async () => {
    // Get the prices from all alerts
    const alerts = await $.get("/api/alerts");
    // Get the prices of metals corresponding with the alerts
    const metals = await $.get("/api/metals");
    for (var i = 0; i < alerts.length; i++) {
      let metalPrice;

      switch (alerts[i].metal) {
        case "gold":
          // Pull out the latest gold price;
          metalPrice = metals[0].gold;
          break;
        case "silver":
          // Pull out the latest silver price;
          metalPrice = metals[0].silver;
          break;
        case "platinum":
          // Pull out the latest platinum price;
          metalPrice = metals[0].platinum;
          break;
        case "palladium":
          // Pull out the latest palladium price;
          metalPrice = metals[0].palladium;
          break;
        case "rhodium":
          // Pull out the latest rhodium price;
          metalPrice = metals[0].rhodium;
      }
      metalPrice = parseFloat(metalPrice);

      // Compare
      if (parseInt(alerts[i].price) > metalPrice) {
        const clientPrice = parseFloat(alerts[i].price);

        // Append the alert to the homepage
        $("#alerts-table").append(
          "</td><td>" +
            alerts[i].metal +
            "</td><td>" +
            "$" +
            clientPrice.toFixed(2) +
            "</td><td>" +
            "$" +
            metalPrice.toFixed(2) +
            "</td></tr>"
        );
      }
    }
  };

  alertUser();
});
