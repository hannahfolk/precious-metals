$(document).ready(function () {
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  signUpForm.on("submit", function (event) {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    const { email, password } = userData;
    if (!email || !password) {
      return;
    }

    signUpUser(email, password);
    emailInput.val("");
    passwordInput.val("");
  });

  const signUpUser = (email, password) => {
    $.post("/api/users/signup", {
      email,
      password,
    })
      .then((data) => {
        window.location.replace("/metals");
      })
      .catch(handleLoginErr);
  };

  const handleLoginErr = (err) => {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  };
});
