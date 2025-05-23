document.addEventListener("DOMContentLoaded", () => {
  const userName = localStorage.getItem("quizpro_user_name");

  if (!userName) {
    askUserName();
  } else {
    const nameDisplay = document.getElementById("usernameDisplay");
    if (nameDisplay) nameDisplay.textContent = `Hello, ${userName}`;
  }

  // Load theme
  const theme = localStorage.getItem("quizpro_theme");
  document.body.className = theme === "dark" ? "dark-theme" : "light-theme";
});

function askUserName() {
  let name = "";

  while (!name || name.trim().length < 2) {
    name = prompt(" Welcome to QuizPRO!\n Please enter your name (Example: Bandhan Das):");
    if (name === null) alert("You must enter a name to continue.");
  }

  localStorage.setItem("quizpro_user_name", name.trim());
  alert(`Thanks, ${name.trim()}! Let's begin.`);
  location.reload();
}

function startQuiz() {
  window.location.href = "levels.html";
}

function goToSettings() {
  window.location.href = "settings.html";
}

function goToLeaderboard() {
  window.location.href = "leaderboard.html";
}

function exitGame() {
  alert("Thanks for playing QuizPRO!");
  
}