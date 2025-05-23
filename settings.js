document.addEventListener("DOMContentLoaded", () => {
  // Sound
  const sound = localStorage.getItem("quizpro_sound") || "on";
  document.getElementById("soundBtn").textContent = sound === "on" ? "sounds: ON" : "sounds: OFF";

  // Theme
  const theme = localStorage.getItem("quizpro_theme") || "light";
  document.getElementById("themeBtn").textContent = theme === "dark" ? "Theme: Dark" : "Theme: Light";

  document.body.className = theme === "dark" ? "dark-theme" : "light-theme";
});

function toggleSound() {
  let sound = localStorage.getItem("quizpro_sound") || "on";
  sound = sound === "on" ? "off" : "on";
  localStorage.setItem("quizpro_sound", sound);
  document.getElementById("soundBtn").textContent = sound === "on" ? "Sound: ON" : "Sound: OFF";
}

function toggleTheme() {
  let theme = localStorage.getItem("quizpro_theme") || "light";
  theme = theme === "light" ? "dark" : "light";
  localStorage.setItem("quizpro_theme", theme);
  document.getElementById("themeBtn").textContent = theme === "dark" ? "Theme: Dark" : "Theme: Light";
  document.body.className = theme === "dark" ? "dark-theme" : "light-theme";
}

function changeUserName() {
  localStorage.removeItem("quizpro_user_name");
  alert("Please enter new name.");
  window.location.href = "index.html";
}

function resetProgress() {
  const confirmReset = confirm("Are you sure? All progress will be lost!");
  if (confirmReset) {
    localStorage.clear();
    alert("Progress reset!");
    window.location.href = "index.html";
  }
}

function goBack() {
  window.location.href = "index.html";
}