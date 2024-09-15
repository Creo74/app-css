// JavaScript for filtering videos based on search input
const searchBar = document.getElementById('search-bar');
const videoCards = document.querySelectorAll('.video-card');
const suggestionBox = document.getElementById('suggestion-box');

// Create an array to hold video titles and corresponding elements
const videos = Array.from(videoCards).map(card => {
    return {
        title: card.querySelector('.video-info h3').textContent,
        element: card
    };
});

// Function to show suggestions
function showSuggestions(query) {
    // Clear previous suggestions
    suggestionBox.innerHTML = '';
    if (query.trim() === '') {
        suggestionBox.style.display = 'none';
        return;
    }

    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredVideos.length === 0) {
        suggestionBox.style.display = 'none';
        return;
    }

    filteredVideos.forEach(video => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.textContent = video.title;
        suggestionItem.addEventListener('click', () => {
            // Scroll to the video element smoothly
            video.element.scrollIntoView({ behavior: 'smooth' });
            // Hide suggestion box
            suggestionBox.style.display = 'none';
            // Clear search bar
            searchBar.value = '';
        });
        suggestionBox.appendChild(suggestionItem);
    });

    suggestionBox.style.display = 'block';
}

// Event listener for input in the search bar
searchBar.addEventListener('input', function (e) {
    const searchQuery = searchBar.value;
    showSuggestions(searchQuery);
});

// Hide suggestion box when clicking outside
document.addEventListener('click', function (e) {
    if (!searchBar.contains(e.target) && !suggestionBox.contains(e.target)) {
        suggestionBox.style.display = 'none';
    }
});
