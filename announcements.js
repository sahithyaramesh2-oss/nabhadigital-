// Load announcements from localStorage
function loadAnnouncements() {
  const container = document.getElementById("announcementContainer");
  container.innerHTML = "";
  const announcements = JSON.parse(localStorage.getItem("announcements")) || [];

  announcements.forEach((a) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${a.title}</strong><br>${a.message} <br><small>🕒 ${a.date}</small>`;
    container.appendChild(li);
  });
}

// Add new announcement
document.getElementById("announcementForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const message = document.getElementById("message").value;
  const date = new Date().toLocaleString();

  const announcements = JSON.parse(localStorage.getItem("announcements")) || [];
  announcements.unshift({ title, message, date });

  localStorage.setItem("announcements", JSON.stringify(announcements));

  document.getElementById("announcementForm").reset();
  loadAnnouncements();
});

// Initial load
loadAnnouncements();
