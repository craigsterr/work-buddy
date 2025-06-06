function msToHMS(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return (
    (hours > 0 ? hours + "h " : "") +
    (minutes > 0 ? minutes + "m " : "") +
    seconds +
    "s"
  );
}

function clamp(num, min, max) {
  return Math.max(min, Math.min(num, max));
}

browser.runtime
  .sendMessage({ type: "getUnproductivityTime" })
  .then((response) => {
    const unproductivityTime = response.unproductivityTime;
    document.getElementById("text-bubble").textContent =
      msToHMS(unproductivityTime);
  });

function updateStats() {
  browser.runtime
    .sendMessage({ type: "getUnproductivityTime" })
    .then((response) => {
      var time = response.unproductivityTime;
      document.getElementById("text-bubble").textContent =
        "Time WASTED: " + msToHMS(time);

      const maxSecs = 60;
      const timeInSecs = time / 1000;
      const maxHealth = 100;
      var currentHealth = maxHealth;

      var healthBarLength = clamp(
        currentHealth - (maxHealth / maxSecs) * timeInSecs,
        0,
        maxHealth
      ).toFixed(2);

      document.getElementById("health-green").style.width =
        healthBarLength + "%";

      console.log("healthBarLength:", healthBarLength);
      if (healthBarLength < 1) {
        document.getElementById("health-green").hidden = true;
      } else {
        document.getElementById("health-green").hidden = false;
      }
    });
}

document.addEventListener("DOMContentLoaded", () => {
  updateStats();
  setInterval(updateStats, 1000); // Update every second
});
