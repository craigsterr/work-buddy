var urlList = [];
let activeTabId = null;
let activeUrl;

if (activeTabId) {
  const tab = browser.tabs.get(activeTabId);
  activeUrl = tab.url;
}

let startTime = null;
let wasteTime = 0; // Total time spent on unproductive URLs
let timerIsRunning = false;
const DEBUG = true;
let maxSecs = 0;
let deathTimer = maxSecs;

const DEFAULT_URLS = [
  "youtube.com",
  "twitter.com",
  "facebook.com",
  "reddit.com",
  "tiktok.com",
  "instagram.com",
];

function createKillNotification() {
  browser.notifications.create({
    type: "basic",
    iconUrl: "images/grave.png",
    title: "u killed me.",
    message: "nice job bud im dead.",
  });
}

// Turns milliseconds into a human-readable format (e.g., "1h 23m 45s")
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

// Load the URL list from storage
async function loadUrlList() {
  const result = await browser.storage.local.get("urlList");
  urlList = result.urlList || [];
}

// Check if currentUrl is in the urlList
function isWasteUrl(currentUrl) {
  return urlList.some((url) => currentUrl.includes(url));
}

function startTimer() {
  startTime = Date.now();
  timerIsRunning = true;
}

function stopTimer() {
  startTime = null;
  timerIsRunning = false;
}

function flushWasteTime() {
  if (!timerIsRunning) return 0; // If timer hasn't started, do nothing
  const timeSpent = Date.now() - startTime;
  wasteTime += timeSpent;
  return timeSpent;
}

function resetTimer() {
  const timeSpent = flushWasteTime();
  stopTimer();
  return timeSpent;
}

function debug(text) {
  if (DEBUG) {
    console.log(text);
  }
}

let lastNotification = 0;
const NOTIFICATION_COOLDOWN_MS = 10 * 1000;

function createHurtNotification() {
  const now = Date.now();
  if (now - lastNotification < NOTIFICATION_COOLDOWN_MS) {
    // Too soon since last notification, skip
    return;
  }
  lastNotification = now;
  browser.notifications.create({
    type: "basic",
    iconUrl: "images/slime_idle.png",
    title: "u are killing me!",
    message: "u switched to an unproductive site!",
  });
}

// Listen for browser startup
browser.runtime.onStartup.addListener(async () => {
  console.log("Browser started");
  await loadUrlList();

  // Get the currently active tab in the current window
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  if (tabs.length > 0) {
    activeTabId = tabs[0].id;
    activeUrl = tabs[0].url;
    console.log(
      "Startup: Set activeTabId to",
      activeTabId,
      "with URL",
      activeUrl
    );

    // Optionally, start the timer if the active tab is a waste URL
    if (isWasteUrl(activeUrl)) {
      startTimer();
      console.log("Startup: Waste URL detected, timer started.");
    }
  }
});

// Listen for extension install/update
browser.runtime.onInstalled.addListener(async () => {
  console.log("Extension installed/updated");
  // Set default URLs by updating browser storage
  const result = await browser.storage.local.get("urlList");
  if (!result.urlList) {
    await browser.storage.local.set({ urlList: DEFAULT_URLS });
  }

  await loadUrlList();

  // Same logic as onStartup
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  if (tabs.length > 0) {
    activeTabId = tabs[0].id;
    activeUrl = tabs[0].url;
    console.log(
      "Install: Set activeTabId to",
      activeTabId,
      "with URL",
      activeUrl
    );

    if (isWasteUrl(activeUrl)) {
      startTimer();
      console.log("Install: Waste URL detected, timer started.");
    }
  }
});
// Listen for messages from the popup or other parts of the extension
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getWasteTime") {
    // If the timer has started (meaning the past URL was Waste), send the time spent on Waste URLs and reset the timer.
    // Keeps updating wasteTime to update in real-time.
    if (startTime) {
      flushWasteTime();
      startTimer();
    }
    sendResponse({ wasteTime });
  }

  // Pull the urlList from storage and update the variable
  if (message.type === "reloadUrlList") {
    loadUrlList();
    console.log("Updated urlList");
  }

  // Return if the active tab is waste
  if (message.type === "isWasteTab") {
    sendResponse({ isWaste: timerIsRunning });
  }

  if (message.type === "isDead") {
    createKillNotification();
  }

  if (message.type === "updateMaxSecs") {
    (async () => {
      const result = await browser.storage.local.get("maxSecs");
      maxSecs = result.maxSecs || 0;
      stopTimer();
      wasteTime = 0;

      const tabs = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (tabs.length > 0) {
        const tab = tabs[0];
        activeTabId = tab.id;
        activeUrl = tab.url;

        if (isWasteUrl(activeUrl)) {
          startTimer();
          console.log("updateMaxSecs: Waste URL detected, timer restarted.");
        } else {
          console.log("updateMaxSecs: Productive URL, timer not restarted.");
        }
      }

      console.log("updateMaxSecs complete");
    })(); // Immediately Invoked Async Function Expression (IIFE)
  }
});

// Listen for tab swapping from one to another
// activeInfo: Information from the active tab
browser.tabs.onActivated.addListener(async (activeInfo) => {
  console.log("-- TAB SWAPPED:", activeInfo.tabId, " --");

  // If there was a previous active tab (before the swap) and we were tracking time
  if (activeTabId && timerIsRunning) {
    // Then add to wasteTime
    const flushedTime = flushWasteTime();

    console.log("Time spent on previous tab:", flushedTime / 1000, "seconds");
    console.log("PASS");
    console.log("Time wasted overall:", msToHMS(wasteTime));
  }

  // Get the new active tab with its details
  activeTabId = activeInfo.tabId;
  const tab = await browser.tabs.get(activeTabId);
  console.log("Active tab URL:", tab.url);

  // If new active tab is waste reset the start timer
  if (isWasteUrl(tab.url)) {
    startTimer();
    createHurtNotification();

    console.log("Waste URL:", tab.url);
  } else {
    // If not, stop the timer
    stopTimer();

    console.log("Productive URL:", tab.url);
  }
});

// Listens for when a tab's URL changes
// tabId: Id of the updated tab
// changeInfo: Describes what changed in the tab (ex. { url: "https://..." })
browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // Check if the active tab is updated (could be not)
  // and if the URL changed
  if (activeTabId === tabId && changeInfo.url) {
    const wasWaste = !(startTime === null);
    const nowWaste = isWasteUrl(changeInfo.url);
    console.log("-- URL CHANGE --");

    // If the new URL is waste
    if (nowWaste) {
      console.log("Changed to waste URL: ", changeInfo.url);

      // and if the last URL is waste then add to wasteTime
      if (wasWaste && timerIsRunning) {
        const flushedTime = flushWasteTime();

        console.log("Time wasted overall:", msToHMS(wasteTime));
        console.log("Time spent on Waste URL:", flushedTime / 1000, "seconds");
      }

      startTimer();
      createHurtNotification();
      console.log("Waste URL detected:", changeInfo.url);
    } else if (startTime) {
      // If the new URL is productive and we were tracking time stop the timer and flush
      const flushedTime = resetTimer();
      console.log("-- NEW URL IS PRODUCTIVE --");
      console.log("Time spent on Waste URL:", flushedTime / 1000, "seconds");
      console.log("Time wasted overall:", msToHMS(wasteTime));
    }
  }
});

//
browser.tabs.onCreated.addListener((tab) => {
  if (tab.url && isWasteUrl(tab.url)) {
    startTime = Date.now();
    activeTabId = tab.id;
    console.log("New tab opened with unproductive URL:", tab.url);
  }
});
