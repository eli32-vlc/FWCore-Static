const summaryInclude = 180;
const fuseOptions = {
    shouldSort: true,
    includeMatches: true,
    threshold: 0.0,
    tokenize: true,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        { name: "title", weight: 0.8 },
        { name: "summary", weight: 0.6 },
        { name: "content", weight: 0.5 },
        { name: "tags", weight: 0.3 }
    ]
};

// Simple search implementation without Fuse.js for lightweight usage, 
// or could import Fuse.js if needed. For now, let's do a simple string match 
// to avoid external dependencies unless requested. 
// A simple "includes" search is often enough.

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-query');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) {
        return;
    }

    let searchData = [];

    fetch('/index.json')
        .then(response => response.json())
        .then(data => {
            searchData = data;
        })
        .catch(err => {
            console.error('Error fetching search index:', err);
        });

    searchInput.addEventListener('input', function (e) {
        const query = e.target.value.toLowerCase();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        const results = searchData.filter(item => {
            return (item.title && item.title.toLowerCase().includes(query)) ||
                   (item.content && item.content.toLowerCase().includes(query));
        });

        renderResults(results);
    });

    function renderResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<p>No results found.</p>';
            return;
        }

        let html = '<ul class="post-container" style="flex-direction: column;">';
        
        results.forEach(item => {
            html += `
            <li style="list-style: none; margin-bottom: 1.5rem;">
                <h3 style="margin-bottom: 0.5rem;"><a href="${item.permalink}">${item.title}</a></h3>
                <p>${item.summary ? item.summary.substring(0, summaryInclude) + '...' : ''}</p>
            </li>`;
        });
        
        html += '</ul>';
        searchResults.innerHTML = html;
    }
});
