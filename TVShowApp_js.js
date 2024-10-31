// Select the form element and add a submit event listener
const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent the default form submission

    const searchTerm = form.elements.query.value; // Get the search term
    const config = { params: { q: searchTerm } }; // Prepare parameters for the API request

    try {
        // Make a GET request to the TVMaze API
        const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
        makeImages(res.data); // Call function to display images
    } catch (error) {
        console.error("Error fetching data:", error); // Log any errors
    }

    form.elements.query.value = ''; // Clear the search input
});

// Function to create and display images
const makeImages = (shows) => {
    const container = document.querySelector('.image-container') || document.createElement('div'); // Select or create the container
    container.classList.add('image-container'); // Add the class to the container

    // Clear previous content before appending new images
    container.innerHTML = '';

    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement('img'); // Create an image element
            img.src = result.show.image.medium; // Set the source to the image URL
            img.classList.add('showImage'); // Add a class for styling
            container.append(img); // Append the image to the container
        }
    }

    // Append the container to the body if it doesn't exist in the DOM
    if (!document.body.contains(container)) {
        document.body.append(container);
    }
};
