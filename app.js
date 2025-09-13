// Sample lessons
const lessonsData = {
  math: [
    { id: "m1", title: "Addition Basics", lang: "English", text: "2 + 2 = 4" },
    { id: "m2", title: "ਜੋੜ (Addition)", lang: "Punjabi", text: "੨ + ੨ = ੪" },
    { id: "m3", title: "जोड़ (Addition)", lang: "Hindi", text: "२ + २ = ४" }
  ],
  science: [
    { id: "s1", title: "Plants Need Sunlight", lang: "English", text: "Plants make food using sunlight." },
    { id: "s2", title: "ਪੌਦੇ ਤੇ ਧੁੱਪ", lang: "Punjabi", text: "ਪੌਦੇ ਧੁੱਪ ਨਾਲ ਭੋਜਨ ਬਣਾਉਂਦੇ ਹਨ।" },
    { id: "s3", title: "पौधों को सूर्य चाहिए", lang: "Hindi", text: "पौधे सूर्य से भोजन बनाते हैं।" }
  ],
  digital: [
    { id: "d1", title: "What is a Computer?", lang: "English", text: "A computer processes information." },
    { id: "d2", title: "ਕੰਪਿਊਟਰ ਕੀ ਹੈ?", lang: "Punjabi", text: "ਕੰਪਿਊਟਰ ਜਾਣਕਾਰੀ ਸੰਭਾਲਦਾ ਹੈ।" },
    { id: "d3", title: "कंप्यूटर क्या है?", lang: "Hindi", text: "कंप्यूटर जानकारी को संभालता है।" }
  ]
};

// Load completed lessons from local storage
let completed = JSON.parse(localStorage.getItem("completedLessons")) || {};

function showLessons(subject) {
  const container = document.getElementById("lessons");
  const title = document.getElementById("subject-title");
  title.innerText = subject.charAt(0).toUpperCase() + subject.slice(1);

  container.innerHTML = "";

  lessonsData[subject].forEach(lesson => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${lesson.title} (${lesson.lang})</h3>
      <p>${lesson.text}</p>
      <button onclick="markCompleted('${lesson.id}')"
        ${completed[lesson.id] ? "disabled" : ""}>
        ${completed[lesson.id] ? "✅ Completed" : "Mark as Completed"}
      </button>
    `;

    container.appendChild(div);
  });
}

function markCompleted(id) {
  completed[id] = true;
  localStorage.setItem("completedLessons", JSON.stringify(completed));
  showLessons(document.getElementById("subject-title").innerText.toLowerCase());
}