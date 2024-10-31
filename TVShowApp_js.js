document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#searchForm');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const searchTerm = form.elements.query.value;
        const config = { params: { q: searchTerm } };

        try {
            const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
            makeImages(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }

        form.elements.query.value = '';
    });

    const makeImages = (shows) => {
        const container = document.querySelector('.image-container') || document.createElement('div');
        container.classList.add('image-container');
        container.innerHTML = '';

        for (let result of shows) {
            if (result.show.image) {
                const img = document.createElement('img');
                img.src = result.show.image.medium;
                img.classList.add('showImage');
                container.append(img);
            }
        }

        if (!document.body.contains(container)) {
            document.body.append(container);
        }
});

