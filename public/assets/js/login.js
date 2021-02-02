$(document).ready(function () {
  const loginForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  loginForm.on("submit", function (event) {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    const { email, password } = userData;

    if (!email || !password) {
      return;
    }

    loginUser(email, password);
    emailInput.val("");
    passwordInput.val("");
  });

  const loginUser = (email, password) => {
    $.post("/api/users/login", {
      email,
      password,
    })
      .then(() => {
        window.location.replace("/metals");
      })
      .catch((err) => {
        console.log(err);
      });
  };
});
