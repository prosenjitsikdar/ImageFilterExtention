document.getElementById('showImagesButton').addEventListener('click', function () {
  const imageLinks = document.getElementById('imageLinks').value.split('\n');
  const brokenLinksContainer = document.getElementById('brokenLinksContainer');

  // Clear previous content
  brokenLinksContainer.innerHTML = '';

  imageLinks.forEach(function (link) {
    const img = new Image();
    img.src = link.trim();

    img.onerror = function () {
      // Image failed to load, display the broken link in a separate container
      const brokenLink = document.createElement('p');
      brokenLink.textContent = 'Broken Link: ' + link.trim();
      brokenLinksContainer.appendChild(brokenLink);
    };
  });
});
