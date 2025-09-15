// ✅ Save data offline using localStorage

// --- Assignments ---
function addAssignment() {
  const input = document.getElementById("assignmentInput");
  if (input.value.trim() === "") return;
  
  let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
  assignments.push(input.value);
  localStorage.setItem("assignments", JSON.stringify(assignments));
  input.value = "";
  loadAssignments();
}

function loadAssignments() {
  const list = document.getElementById("assignmentList");
  list.innerHTML = "";
  let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
  assignments.forEach((a, i) => {
    const li = document.createElement("li");
    li.textContent = a;
    list.appendChild(li);
  });
}



// --- Reports (Dummy Data) ---
function loadReports() {
  const tbody = document.querySelector("#progressTable tbody");
  tbody.innerHTML = "";
  let students = [
    { name: "Aman", submissions: 3 },
    { name: "Simran", submissions: 5 },
    { name: "Raj", submissions: 2 }
  ];
  students.forEach(s => {
    let row = document.createElement("tr");
    row.innerHTML = `<td>${s.name}</td><td>${s.submissions}</td>`;
    tbody.appendChild(row);
  });
}

// --- On Page Load ---
window.onload = () => {
  loadAssignments();
  loadReports();
};
