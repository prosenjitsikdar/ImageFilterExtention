document.addEventListener("DOMContentLoaded", function () {
  const imageLinksTextarea = document.getElementById("imageLinks");
  const lineCountContainer = document.getElementById("lineCountContainer");
  const imageLinksContainer = document.getElementById("imageLinksContainer");
  const linkCountContainer = document.getElementById("linkCountContainer");

  // Function to update the line count
  function updateLineCount() {
    const lines = imageLinksTextarea.value.split('\n').filter(Boolean).length;
    lineCountContainer.textContent = `Total Links: ${lines}`;
  }

  // Function to count the number of divs with data-link attribute
  function countDivsWithDataLink() {
    const divCount = imageLinksContainer.querySelectorAll('div[data-link]').length;
    linkCountContainer.textContent = `Total Links: ${divCount}`;
  }

  // Add an event listener to the textarea
  imageLinksTextarea.addEventListener("input", updateLineCount);

  // Initial line count
  updateLineCount();

  // Create a function to copy the content of divs with data-link
  function copyImageUrls() {
    const imageDivs = imageLinksContainer.querySelectorAll('div[data-link]');
    if (imageDivs.length > 0) {
      const textToCopy = Array.from(imageDivs).map(div => div.dataset.link).join('\n');

      // Create a temporary textarea element to copy the text to the clipboard
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      // Alert the user
      alert("Text copied to clipboard:\n" + textToCopy);
    } else {
      alert("No image links found.");
    }
  }

  document.getElementById("copytext").addEventListener("click", copyImageUrls);

  // Add a MutationObserver to count divs with data-link when the page loads
  const observer = new MutationObserver(countDivsWithDataLink);
  const observerConfig = { childList: true, subtree: true };
  observer.observe(imageLinksContainer, observerConfig);
});
