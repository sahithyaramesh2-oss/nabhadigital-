// Simulated students for demo
const students = [
  { id: "stu1", name: "Aman" },
  { id: "stu2", name: "Simran" },
  { id: "stu3", name: "Rahul" }
];

// Get total lessons (from student app)
const totalLessons = Object.values({
  math: ["m1","m2","m3"],
  science: ["s1","s2","s3"],
  digital: ["d1","d2","d3"]
}).flat().length;

// In a real system: Each student has their own login.
// For demo: We’ll use the same localStorage "completedLessons".
const completed = JSON.parse(localStorage.getItem("completedLessons")) || {};

function renderTable() {
  const tbody = document.querySelector("#progress-table tbody");
  tbody.innerHTML = "";

  students.forEach(student => {
    // Demo: all students share same data for now
    const completedCount = Object.keys(completed).length;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${completedCount}</td>
      <td>${totalLessons}</td>
      <td>${Math.round((completedCount / totalLessons) * 100)}%</td>
    `;
    tbody.appendChild(row);
  });
}

renderTable();