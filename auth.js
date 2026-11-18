document.querySelectorAll(".password-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.parentElement.querySelector("input");
    const showPassword = input.type === "password";
    input.type = showPassword ? "text" : "password";
    button.textContent = showPassword ? "Hide" : "Show";
    button.setAttribute("aria-label", `${showPassword ? "Hide" : "Show"} password`);
  });
});

document.querySelectorAll("[data-auth-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = form.querySelector(".auth-message");
    message.textContent = "Account services aren't connected yet. Connect an authentication service to continue.";
  });
});

const forgotPasswordLink = document.querySelector(".forgot-password");
if (forgotPasswordLink) {
  forgotPasswordLink.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(".auth-message").textContent = "Password reset isn't connected yet. Please contact the shop for help.";
  });
}
