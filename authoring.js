document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("lessonForm");
  const lessonList = document.getElementById("lessonList");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const desc = document.getElementById("desc").value.trim();
    const media = document.getElementById("media").value.trim();

    if (!title || !desc) {
      alert("Please fill in all required fields!");
      return;
    }

    // Create lesson card
    const card = document.createElement("div");
    card.className = "lesson-card";
    card.innerHTML = `
      <h3>${title}</h3>
      <p>${desc}</p>
      ${media ? (media.endsWith(".mp4") ? 
        `<video controls src="${media}"></video>` : 
        `<img src="${media}" alt="Lesson Media">`) : ""}
    `;

    lessonList.appendChild(card);

    // Reset form
    form.reset();
  });
});
