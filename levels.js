document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("levelContainer");

  // Get unlocked level from localStorage or default to 1
  const unlockedLevel = parseInt(localStorage.getItem("unlockedLevel") || "1");

  for (let i = 1; i <= 50; i++) {
    const btn = document.createElement("button");
    btn.classList.add("level-btn");

    if (i <= unlockedLevel) {
      btn.textContent = `Level ${i}`;
      btn.onclick = () => {
      localStorage.setItem("currentLevel", i)
        window.location.href = "quiz.html";
      };
    } 
    else {
      btn.textContent = `🔒 ${i}`;
      btn.classList.add("locked");
      btn.onclick = () => {
        alert("Please complete the previous level to unlock this!");
      };
    }

    container.appendChild(btn);
  }
});

function goHome() {
  window.location.href = "index.html";
}