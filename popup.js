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

const DEBUG = true;
function debug(text) {
  if (DEBUG) {
    console.log(text);
  }
}

function clamp(num, min, max) {
  return Math.max(min, Math.min(num, max));
}

let isDead = false;

async function getDeathCount() {
  const result = await browser.storage.local.get("slimeDeaths");
  return result.slimeDeaths || 0;
}

async function incrementDeathCount() {
  const current = await getDeathCount();
  const newCount = current + 1;
  await browser.storage.local.set({ slimeDeaths: newCount });
  return newCount;
}

let deathCount = 0;

// Update the health bar and time wasted text bar
async function updateStats() {
  // Request wasteTime so far
  debug("updateStats()");
  const { maxSecs } = await browser.storage.local.get("maxSecs");
  if (maxSecs) {
    browser.runtime
      .sendMessage({ type: "getWasteTime" })
      .then(async (response) => {
        var time = response.wasteTime;
        document.getElementById("text-bubble").textContent =
          "Time wasted: " + msToHMS(time);

        debug("Time wasted: " + msToHMS(time));

        // Use the max seconds to determine the damage over time for health bar

        const timeInSecs = time / 1000;
        const maxHealth = 200;
        var currentHealth = maxHealth;
        var healthBarLength = clamp(
          currentHealth - (maxHealth / maxSecs) * timeInSecs,
          0,
          maxHealth
        ).toFixed(2);

        // Update the health bar width
        document.getElementById("health-green").style.width =
          healthBarLength + "%";

        const slimeBuddy = document.getElementById("slime-buddy");

        // Disappear health bar if it goes under 1.
        if (healthBarLength <= 0) {
          if (!isDead) {
            await incrementDeathCount();
            deathCount = await getDeathCount();
          }

          document.getElementById("health-green").hidden = true;
          isDead = true;
          slimeBuddy.src = "images/grave.png";
          document.getElementById("text-bubble").textContent =
            "You killed your work slime. Reset in the settings.\nSlimes killed: " +
            deathCount;
        } else {
          document.getElementById("health-green").hidden = false;
          isDead = false;
          // Only update the slime if not dead
          browser.runtime
            .sendMessage({ type: "isWasteTab" })
            .then((response) => {
              const isWaste = response.isWaste;
              if (isWaste) {
                slimeBuddy.src = "images/slime_hurt.gif";
              } else {
                slimeBuddy.src = "images/slime.gif";
              }
            });
        }
      });
  } else {
    document.getElementById("text-bubble").textContent =
      "I'm your work slime! Set your unproductive time and blocked sites using the settings above.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateStats();
  setInterval(updateStats, 1000); // Update every second
});
