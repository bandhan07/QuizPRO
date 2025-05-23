const username = localStorage.getItem("quizpro_username") || "Unknown Player";

function goHome() {
  window.location.href = "index.html";
}

const dbRef = firebase.database().ref("users");

// Fetch top 25 players
dbRef.orderByChild("highestLevel").limitToLast(25).once("value", snapshot => {
  const topPlayers = [];

  snapshot.forEach(child => {
    const data = child.val();
    topPlayers.push({
      name: child.key,
      level: data.highestLevel || 1
    });
  });

  // Sort highest to lowest
  topPlayers.sort((a, b) => b.level - a.level);

  const list = document.getElementById("topList");
  list.innerHTML = "";

  topPlayers.forEach((player, index) => {
    const li = document.createElement("li");
    li.textContent = `${player.name} - Level ${player.level}`;
    list.appendChild(li);
  });
});

// Show current user's rank
dbRef.orderByChild("highestLevel").once("value", snapshot => {
  const allPlayers = [];

  snapshot.forEach(child => {
    allPlayers.push({
      name: child.key,
      level: child.val().highestLevel || 1
    });
  });

  // Sort all descending
  allPlayers.sort((a, b) => b.level - a.level);

  const yourIndex = allPlayers.findIndex(p => p.name === username);
  const yourData = allPlayers[yourIndex];

  const rankText = yourIndex >= 0 
    ? `Your Rank: #${yourIndex + 1} | ${yourData.name} - Level ${yourData.level}`
    : `Your progress is not ranked yet.`;

  document.getElementById("yourRank").innerText = rankText;
});