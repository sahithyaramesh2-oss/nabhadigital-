const doubtList = document.getElementById('doubtList');

function submitDoubt() {
  const input = document.getElementById('doubtInput');
  const doubtText = input.value.trim();

  if (doubtText === "") {
    alert("Please enter a doubt!");
    return;
  }

  // Create doubt box
  const doubtDiv = document.createElement('div');
  doubtDiv.className = 'doubt';
  doubtDiv.innerHTML = `
    <p><strong>Student:</strong> ${doubtText}</p>
    <textarea placeholder="Write answer..."></textarea>
    <button onclick="submitAnswer(this)">Answer</button>
  `;

  doubtList.prepend(doubtDiv); // latest doubt on top
  input.value = "";
}

function submitAnswer(button) {
  const doubtDiv = button.parentElement;
  const answerText = doubtDiv.querySelector('textarea').value.trim();

  if (answerText === "") {
    alert("Please enter an answer!");
    return;
  }

  // Remove input + button
  doubtDiv.querySelector('textarea').remove();
  button.remove();

  // Add answer display
  const answerDiv = document.createElement('div');
  answerDiv.className = 'answer';
  answerDiv.innerHTML = <strong>Answer:</strong> ;{answerText};
  doubtDiv.appendChild(answerDiv);
}