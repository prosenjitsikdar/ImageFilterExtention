document.getElementById("copytext").addEventListener("click", function () {
    // Get the text inside the div with id 'imageLinksContainer'
    const imageLinksContainer = document.getElementById("imageLinksContainer");
    if (imageLinksContainer) {
      const textToCopy = imageLinksContainer.innerText;

      // Create a temporary textarea element to copy the text to the clipboard
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      // Alert the user
      alert("Text copied to clipboard: \n" + textToCopy);
    } else {
      alert("The div with id 'imageLinksContainer' was not found.");
    }
  });