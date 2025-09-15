// Multilingual text
const UI = {
  en: {
    assignments: "Assignments",
    assignmentsSub: "View your tasks and submit answers below.",
    submit: "Submit Answer",
    answersTitle: "Your Answers",
    noAnswers: "No answers yet.",
    enterAnswer: "Enter your answer here...",
    subject: "Subjects"
  },
  pa: {
    assignments: "ਸੌਂਪਣੀਆਂ",
    assignmentsSub: "ਹੇਠਾਂ ਦਿੱਤੇ ਟਾਸਕ ਵੇਖੋ ਅਤੇ ਆਪਣੇ ਉੱਤਰ ਭਰੋ।",
    submit: "ਉੱਤਰ ਭੇਜੋ",
    answersTitle: "ਤੁਹਾਡੇ ਉੱਤਰ",
    noAnswers: "ਹਜੇ ਕੋਈ ਉੱਤਰ ਨਹੀਂ।",
    enterAnswer: "ਇੱਥੇ ਆਪਣਾ ਉੱਤਰ ਲਿਖੋ...",
    subject: "ਵਿਸ਼ੇ"
  },
  hi: {
    assignments: "असाइनमेंट",
    assignmentsSub: "नीचे असाइन किए गए कार्य देखें और अपने उत्तर जमा करें।",
    submit: "उत्तर जमा करें",
    answersTitle: "आपके उत्तर",
    noAnswers: "अभी कोई उत्तर नहीं।",
    enterAnswer: "यहाँ अपना उत्तर दर्ज करें...",
    subject: "विषय"
  }
};

let LANG = localStorage.getItem("ndl_lang") || "en";
let studentName = localStorage.getItem("ndl_student_name") || "";
let answers = JSON.parse(localStorage.getItem("ndl_answers")) || {};

// Sample assignments per subject
const assignments = {
  math: [
    { id: "math1", title: { en: "Addition", pa: "ਜੋੜ", hi: "जोड़" }, question: { en: "2 + 3 = ?", pa: "2 + 3 = ?", hi: "2 + 3 = ?" } },
    { id: "math2", title: { en: "Subtraction", pa: "ਘਟਾਓ", hi: "घटाना" }, question: { en: "7 - 4 = ?", pa: "7 - 4 = ?", hi: "7 - 4 = ?" } }
  ],
  science: [
    { id: "sci1", title: { en: "Plants", pa: "ਪੌਦੇ", hi: "पौधे" }, question: { en: "Why do plants need sunlight?", pa: "ਪੌਦਿਆਂ ਨੂੰ ਧੁੱਪ ਦੀ ਲੋੜ ਕਿਉਂ ਹੈ?", hi: "पौधों को सूर्य की आवश्यकता क्यों है?" } }
  ],
  english: [
    { id: "eng1", title: { en: "Grammar", pa: "ਵਿਆਕਰਣ", hi: "व्याकरण" }, question: { en: "Write a sentence using 'school'.", pa: "‘ਸਕੂਲ’ ਵਰਤ ਕੇ ਇੱਕ ਵਾਕ ਬਣਾਓ।", hi: "‘स्कूल’ का प्रयोग करके एक वाक्य लिखें।" } }
  ]
};

let currentSubject = "math";

function $(id) { return document.getElementById(id); }

function renderUI() {
  $("assignments-title").textContent = UI[LANG].assignments;
  $("assignments-sub").textContent = UI[LANG].assignmentsSub;
  $("submitted-title").textContent = UI[LANG].answersTitle;
  $("subject-title").textContent = UI[LANG].subject;

  $("student-name-display").textContent = studentName ? `👤 ${studentName}` : "";

  renderAssignments();
  renderAnswers();
}

function renderAssignments() {
  const list = $("assignList");
  list.innerHTML = "";
  assignments[currentSubject].forEach(a => {
    const div = document.createElement("div");
    div.className = "assign-item";
    div.innerHTML = `
      <h3>${a.title[LANG]}</h3>
      <p>${a.question[LANG]}</p>
      <textarea id="ans-${a.id}" placeholder="${UI[LANG].enterAnswer}">${answers[a.id]?.answer || ""}</textarea>
      <button class="btn" onclick="saveAnswer('${a.id}')">${UI[LANG].submit}</button>
    `;
    list.appendChild(div);
  });
}

function saveAnswer(id) {
  const text = $("ans-" + id).value.trim();
  if (!studentName) {
    alert("Please save your name first!");
    return;
  }
  answers[id] = { answer: text, time: new Date().toLocaleString() };
  localStorage.setItem("ndl_answers", JSON.stringify(answers));
  renderAnswers();
}

function renderAnswers() {
  const box = $("answersList");
  const subjectAnswers = assignments[currentSubject].map(a => answers[a.id]).filter(Boolean);

  if (!subjectAnswers.length) {
    box.textContent = UI[LANG].noAnswers;
    return;
  }

  box.innerHTML = "";
  assignments[currentSubject].forEach(a => {
    if (answers[a.id]) {
      const div = document.createElement("div");
      div.innerHTML = `<b>${a.title[LANG]}:</b> ${answers[a.id].answer} <span class="muted">(${answers[a.id].time})</span>`;
      box.appendChild(div);
    }
  });
}

// Language toggle
$("btn-en").onclick = () => { LANG = "en"; localStorage.setItem("ndl_lang", LANG); renderUI(); };
$("btn-pa").onclick = () => { LANG = "pa"; localStorage.setItem("ndl_lang", LANG); renderUI(); };
$("btn-hi").onclick = () => { LANG = "hi"; localStorage.setItem("ndl_lang", LANG); renderUI(); };

// Save student name
$("saveName").onclick = () => {
  studentName = $("studentName").value.trim();
  localStorage.setItem("ndl_student_name", studentName);
  renderUI();
};

// Subject selection
$("subjectSelect").onchange = e => {
  currentSubject = e.target.value;
  renderAssignments();
  renderAnswers();
};

// Initial load
$("studentName").value = studentName;
renderUI();

// ---------------- PWA Service Worker ----------------
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
