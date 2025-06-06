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
      localStorage.setItem("urlList", JSON.stringify(urlList));
      renderUrlList();
    });

    removeSpan.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent li click
      urlList.splice(urlList.indexOf(url), 1);
      localStorage.setItem("urlList", JSON.stringify(urlList));
      renderUrlList();
    });

    listItem.appendChild(removeSpan);
    urlListElement.appendChild(listItem);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const urlInput = document.getElementById("urlInput");
  const addUrlButton = document.getElementById("addUrlButton");

  const savedUrls = localStorage.getItem("urlList");
  if (savedUrls) {
    urlList = JSON.parse(savedUrls); // Load saved URLs from localStorage
    renderUrlList(); // Render the list on page load
  }

  addUrlButton.addEventListener("click", () => {
    const url = normalizeUrl(urlInput.value);

    if (!urlInput.value) {
      alert("Please enter a valid URL.");
      return;
    }

    urlList.push(url); // Add the normalized URL to the list
    urlInput.value = ""; // Clear the input field

    renderUrlList();

    localStorage.setItem("urlList", JSON.stringify(urlList));
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

      localStorage.setItem("urlList", JSON.stringify(urlList));
    }
  });
});
