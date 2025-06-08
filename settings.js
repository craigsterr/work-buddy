urlList = [];

// Function to normalize the URL input
// This function ensures the URL starts with http:// or https:// and removes trailing slashes
function normalizeUrl(urlInput) {
  const url = urlInput.trim();
  if (!/^https?:\/\//i.test(url)) {
    return url;
  }

  url = url.replace(/\/+$/, "");
  return url;
}
function renderUrlList() {
  const urlListElement = document.getElementById("urlList");
  urlListElement.innerHTML = ""; // Clear existing list items
  urlList.forEach((url) => {
    const listItem = document.createElement("li");
    listItem.className =
      "relative group cursor-pointer transition-bg duration-300 hover:bg-rose-600/10 px-2 py-1 flex items-center space-x-2 rounded-md";
    listItem.textContent = url;

    // Create the minus sign span
    const removeSpan = document.createElement("span");
    removeSpan.textContent = "(remove)";
    removeSpan.className =
      "ml-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer";

    // Remove on click of minus
    listItem.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent li click
      urlList.splice(urlList.indexOf(url), 1);
      browser.storage.local.set({ urlList });
      browser.runtime.sendMessage({ type: "reloadUrlList" });

      renderUrlList();
    });

    removeSpan.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent li click
      urlList.splice(urlList.indexOf(url), 1);
      browser.storage.local.set({ urlList });
      browser.runtime.sendMessage({ type: "reloadUrlList" });

      renderUrlList();
    });

    listItem.appendChild(removeSpan);
    urlListElement.appendChild(listItem);
  });
}

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

let maxTimeMs = null;

// Upon popup opening
document.addEventListener("DOMContentLoaded", async () => {
  // Ids for max time input fields and button
  const setMaxTime = document.getElementById("setMaxTime");
  const hoursInput = document.getElementById("hours");
  const minutesInput = document.getElementById("minutes");
  const secondsInput = document.getElementById("seconds");

  const { maxSecs } = await browser.storage.local.get("maxSecs");
  if (maxSecs) {
    const maxTimeText = document.getElementById("max-time");
    maxTimeText.textContent = msToHMS(maxSecs * 1000);
  }

  // Click on max time add button
  setMaxTime.addEventListener("click", () => {
    const response = confirm(
      "Warning: Setting a new max time will overwrite your current session progress. Proceed?"
    );

    // If the user presses confirm
    if (response) {
      const hours = parseInt(hoursInput.value || 0);
      const minutes = parseInt(minutesInput.value || 0);
      const seconds = parseInt(secondsInput.value || 0);

      if (minutes <= 59 && seconds <= 59) {
        // Convert to milliseconds
        let maxTimeMs = 1000 * (hours * 60 * 60 + minutes * 60 + seconds);
        const maxTimeText = document.getElementById("max-time");
        maxTimeText.textContent = msToHMS(maxTimeMs);
        const maxSecs = maxTimeMs / 1000;
        browser.storage.local.set({ maxSecs: maxSecs });
        browser.runtime.sendMessage({ type: "updateMaxSecs" });
      } else {
        if (minutes > 59) alert("Minutes must be less than 60");
        if (seconds > 59) alert("Seconds must be less than 60");
      }

      hoursInput.value = "";
      minutesInput.value = "";
      secondsInput.value = "";
    }
  });

  const urlInput = document.getElementById("urlInput");
  const addUrlButton = document.getElementById("addUrlButton");

  browser.storage.local.get("urlList").then((result) => {
    urlList = result.urlList || [];
    browser.runtime.sendMessage({ type: "reloadUrlList" });

    renderUrlList();
  });

  addUrlButton.addEventListener("click", () => {
    const url = normalizeUrl(urlInput.value);

    if (!urlInput.value) {
      alert("Please enter a valid URL.");
      return;
    }

    urlList.push(url); // Add the normalized URL to the list
    urlInput.value = ""; // Clear the input field

    renderUrlList();

    browser.storage.local.set({ urlList });
    browser.runtime.sendMessage({ type: "reloadUrlList" });
  });

  addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const url = normalizeUrl(urlInput.value);

      if (!urlInput.value) {
        alert("Please enter a valid URL.");
        return;
      }

      urlList.push(url); // Add the normalized URL to the list
      urlInput.value = ""; // Clear the input field

      renderUrlList();

      browser.storage.local.set({ urlList });
      browser.runtime.sendMessage({ type: "reloadUrlList" });
    }
  });
});
