<<<<<<< HEAD
// Language toggle
const langToggle = document.getElementById("lang-toggle");
if (langToggle) {
  langToggle.addEventListener("click", () => {
    const isEnglish = document.body.lang === "en" || !document.body.lang;
    document.body.lang = isEnglish ? "pa" : "en";
    switchLanguage(document.body.lang);
  });
}

function switchLanguage(lang) {
  const translations = {
    en: {
      title: "Teacher Dashboard",
      "welcome-text": "Welcome, Teacher!",
      "desc-text": "Here you can manage your content, upload lectures, and track student progress.",
      "upload-title": "Add New Lecture",
      "label-title": "Lecture Title:",
      "label-file": "Upload File:",
      "upload-btn": "Upload",
      "list-title": "Uploaded Lectures"
    },
    pa: {
      title: "ਅਧਿਆਪਕ ਡੈਸ਼ਬੋਰਡ",
      "welcome-text": "ਸਵਾਗਤ ਹੈ, ਅਧਿਆਪਕ ਜੀ!",
      "desc-text": "ਇੱਥੇ ਤੁਸੀਂ ਆਪਣੀ ਸਮੱਗਰੀ ਸੰਭਾਲ ਸਕਦੇ ਹੋ, ਲੈਕਚਰ ਅਪਲੋਡ ਕਰ ਸਕਦੇ ਹੋ ਅਤੇ ਵਿਦਿਆਰਥੀਆਂ ਦੀ ਪ੍ਰਗਤੀ ਦੇਖ ਸਕਦੇ ਹੋ।",
      "upload-title": "ਨਵਾਂ ਲੈਕਚਰ ਜੋੜੋ",
      "label-title": "ਲੈਕਚਰ ਸਿਰਲੇਖ:",
      "label-file": "ਫਾਈਲ ਅਪਲੋਡ ਕਰੋ:",
      "upload-btn": "ਅਪਲੋਡ ਕਰੋ",
      "list-title": "ਅਪਲੋਡ ਕੀਤੇ ਲੈਕਚਰ"
    }
  };

  const dict = translations[lang];
  for (const id in dict) {
    const el = document.getElementById(id);
    if (el) el.textContent = dict[id];
  }
}

// Lecture Upload (temporary demo storage)
const uploadForm = document.querySelector(".upload-form");
const lectureList = document.getElementById("lecture-list");

if (uploadForm && lectureList) {
  uploadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("lecture-title").value;
    const file = document.getElementById("lecture-file").files[0];

    if (title && file) {
      const li = document.createElement("li");
      li.textContent = `${title} - ${file.name}`;
      lectureList.appendChild(li);
      uploadForm.reset();
    } else {
      alert("Please enter a title and upload a file.");
    }
  });
}
=======
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
>>>>>>> 1284b4489507eb619fca88b038639a85cd750f9d
