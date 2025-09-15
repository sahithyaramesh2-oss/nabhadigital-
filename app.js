// Simple interactive script for index.html
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("learnMoreBtn");
  const info = document.getElementById("infoText");

  btn.addEventListener("click", () => {
    if (info.style.display === "none") {
      info.style.display = "block";
      btn.textContent = "Hide Info";
    } else {
      info.style.display = "none";
      btn.textContent = "Learn More";
    }
  });
});
