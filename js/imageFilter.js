// Get references to DOM elements
const imageLinksTextarea = document.getElementById('imageLinks');
const showImagesButton = document.getElementById('showImagesButton');
const imageContainer = document.getElementById('imageContainer');
const imageLinksContainer = document.getElementById('imageLinksContainer');
const loader = document.getElementById('loader'); // Add this line

// Function to remove an image and its container
function removeImage(imageElement) {
  const imageDiv = imageElement.parentElement;
  imageContainer.removeChild(imageDiv);
  // Remove the corresponding link from the container
  const linkElement = imageLinksContainer.querySelector(`[data-link="${imageElement.src}"]`);
  if (linkElement) {
    imageLinksContainer.removeChild(linkElement);
  }
}

// Add a click event listener to the button
showImagesButton.addEventListener('click', () => {
  // Clear existing images and links
  imageContainer.innerHTML = '';
  imageLinksContainer.innerHTML = '';

  // Show the loader while images are loading
  loader.style.display = 'block'; // Add this line

  // Split the textarea content by lines and iterate over each line
  const links = imageLinksTextarea.value.split('\n');

  // Create an array to hold all images
  const images = [];

  links.forEach((link) => {
    const trimmedLink = link.trim(); // Trim any leading/trailing spaces

    // Create a div to hold each image
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image-container');

    // Create an image element for each link
    const img = new Image();
    img.src = trimmedLink; // Set image source

    // Calculate the aspect ratio based on width and height
    img.onload = function () {
      const aspectRatio = img.width / img.height;

      // Attach the aspect ratio as a data attribute
      img.setAttribute('data-aspect', aspectRatio);

      // Create a delete button
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';

      // Add a click event listener to the delete button
      deleteButton.addEventListener('click', () => {
        removeImage(img);
      });

      // Append the image and delete button to the container
      imageDiv.appendChild(img);
      imageDiv.appendChild(deleteButton);

      // Push the image into the images array
      images.push({ div: imageDiv, aspect: aspectRatio });

      // Check if all images have been processed
      if (images.length === links.length) {
        // Sort the images based on aspect ratio (ascending order)
        images.sort((a, b) => a.aspect - b.aspect);

        // Clear the main image container
        imageContainer.innerHTML = '';

        // Append the sorted images to the container
        images.forEach((sortedImg) => {
          imageContainer.appendChild(sortedImg.div);

          // Find and append the corresponding link below the image
          const correspondingLink = links.find((link) =>
            link.trim() === sortedImg.div.firstChild.src
          );
          if (correspondingLink) {
            const linkElement = document.createElement('div');
            linkElement.innerText = correspondingLink.trim();
            linkElement.setAttribute('data-link', sortedImg.div.firstChild.src);
            imageLinksContainer.appendChild(linkElement);
          }
        });

        // Hide the loader after all images are loaded
        loader.style.display = 'none'; // Add this line
      }
    };
  });
});
