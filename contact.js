// Contact form validation & success message
document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Stop page reload

  // Get form values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
    alert("⚠️ Please fill out all fields before submitting.");
    return;
  }

  // Simple email format check
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    alert("⚠️ Please enter a valid email address.");
    return;
  }

  // Show success message
  document.getElementById("successMessage").style.display = "block";

  // Clear form fields
  document.getElementById("contactForm").reset();
});
