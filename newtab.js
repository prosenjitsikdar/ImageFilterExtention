document.addEventListener('DOMContentLoaded', function () {
    var openNewTabButton = document.getElementById('openNewTabButton');
  
    openNewTabButton.addEventListener('click', function () {
      // Define the URL of the HTML page you want to open in the new tab
      var newTabUrl = chrome.runtime.getURL('filter.html');
  
      // Create a new tab with the specified URL
      chrome.tabs.create({ url: newTabUrl });
    });
  });
  