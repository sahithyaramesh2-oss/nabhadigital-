// about.js - Simple & Unique Interactivity for About Page

document.addEventListener("DOMContentLoaded", () => {
  // Fade-in effect for the About container
  const aboutBox = document.querySelector(".about-container");
  if (aboutBox) {
    aboutBox.style.opacity = 0;
    setTimeout(() => {
      aboutBox.style.transition = "opacity 1s ease-in-out";
      aboutBox.style.opacity = 1;
    }, 200);
  }

  // Highlight message toggle
  const highlight = document.querySelector(".highlight");
  if (highlight) {
    highlight.addEventListener("click", () => {
      highlight.classList.toggle("active");
      if (highlight.classList.contains("active")) {
        highlight.style.background = "#c8e6c9";
        highlight.style.color = "#1b5e20";
      } else {
        highlight.style.background = "#e8f5e9";
        highlight.style.color = "#2e7d32";
      }
    });
  }

  // Team member hover info
  const teamMembers = document.querySelectorAll(".team-member");
  teamMembers.forEach(member => {
    member.addEventListener("mouseenter", () => {
      member.style.transform = "scale(1.05)";
      member.style.background = "#f1f8e9";
    });
    member.addEventListener("mouseleave", () => {
      member.style.transform = "scale(1)";
      member.style.background = "#fafafa";
    });
  });

  // Fun fact rotation
  const facts = [
    "Education is the most powerful tool for change.",
    "Digital literacy opens doors to endless opportunities.",
    "Learning is a treasure that will follow its owner everywhere.",
    "Technology can bridge the gap between rural and urban education."
  ];

  const factBox = document.createElement("div");
  factBox.className = "fact-box";
  factBox.style.marginTop = "20px";
  factBox.style.textAlign = "center";
  factBox.style.fontStyle = "italic";
  factBox.style.color = "#555";
  document.querySelector(".about-container").appendChild(factBox);

  let i = 0;
  function showFact() {
    factBox.textContent = facts[i];
    i = (i + 1) % facts.length;
  }
  showFact();
  setInterval(showFact, 4000);
});