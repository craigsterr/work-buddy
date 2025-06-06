const urlList = JSON.parse(localStorage.getItem("urlList")) || [];
let activeTabId = null;
let startTime = null;
let unproductivityTime = 0;

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

function isUnproductive(currentUrl) {
  return urlList.some((url) => currentUrl.includes(url));
}

function startTimer() {
  startTime = Date.now();
  console.log("Timer started for unproductive URL:", activeTabId);
}

function stopTimer() {
  const timeSpent = Date.now() - startTime;
  unproductivityTime += timeSpent;
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (startTime) {
    const timeSpent = Date.now() - startTime;
    unproductivityTime += timeSpent;
    startTime = Date.now(); // Reset start time for the next interval
    // console.log("Time spent on unproductive URL:", timeSpent / 1000, "seconds");
    // console.log("Time wasted overall:", msToHMS(unproductivityTime));
  }

  if (message.type === "getUnproductivityTime") {
    sendResponse({ unproductivityTime });
  }
});

browser.tabs.onActivated.addListener(async (activeInfo) => {
  // console.log("-- TAB CHANGED:", activeInfo.tabId, " --");

  if (activeTabId && startTime) {
    // If there was a previous active tab and we were tracking time
    // console.log("-- PREVIOUS ACTIVE TAB EXISTS --");
    const timeSpent = Date.now() - startTime;
    unproductivityTime += timeSpent;
    console.log("Time spent on previous tab:", timeSpent / 1000, "seconds");
    console.log("Time wasted overall:", msToHMS(unproductivityTime));
  }

  activeTabId = activeInfo.tabId;
  const tab = await browser.tabs.get(activeTabId);

  if (isUnproductive(tab.url)) {
    // Check if the new active tab is unproductive
    // console.log("-- NEW TAB IS UNPRODUCTIVE --");
    startTime = Date.now();
    console.log("Unproductive URL detected:", tab.url);
  } else {
    // console.log("-- NEW TAB IS PRODUCTIVE --");
    startTime = null;
  }
});

browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tabId === activeTabId && changeInfo.url) {
    const wasUnproductive = !(startTime === null);
    const nowUnproductive = isUnproductive(changeInfo.url);
    // Check if the updated tab is the active one
    // console.log("-- NEW URL --");
    if (nowUnproductive) {
      // Check if the new URL is unproductive
      // console.log("-- NEW URL IS UNPRODUCTIVE --");
      console.log("URL changed:", changeInfo.url, "in tab:", tabId);
      // console.log("Date.now():", Date.now());
      // console.log("startTime:", startTime);

      if (wasUnproductive && startTime) {
        const timeSpent = Date.now() - startTime;
        unproductivityTime += timeSpent;

        console.log("Time wasted overall:", msToHMS(unproductivityTime));

        console.log(
          "Time spent on unproductive URL:",
          timeSpent / 1000,
          "seconds"
        );
      }

      startTime = Date.now();

      console.log("Unproductive URL detected:", changeInfo.url);
    } else if (startTime) {
      // If the new URL is productive and we were tracking time
      // console.log("-- NEW URL IS PRODUCTIVE --");
      const timeSpent = Date.now() - startTime;
      unproductivityTime += timeSpent;

      console.log(
        "Time spent on unproductive URL:",
        timeSpent / 1000,
        "seconds"
      );
      console.log("Time wasted overall:", msToHMS(unproductivityTime));

      startTime = null;
    }
  }
});

window.addEventListener(
  "hashchange",
  (event) => {
    console.log("The URL hash has changed!");
    // You can access the new URL via event.newURL and the old URL via event.oldURL
    console.log("New URL:", event.newURL);
    console.log("Old URL:", event.oldURL);
  },
  false
);

browser.tabs.onCreated.addListener((tab) => {
  if (tab.url && isUnproductive(tab.url)) {
    startTime = Date.now();
    activeTabId = tab.id;
    console.log("New tab opened with unproductive URL:", tab.url);
  }
});
