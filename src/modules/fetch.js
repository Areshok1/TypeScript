const dataContainer = document.getElementById('data-container');

async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        
        data.slice(0, 5).forEach((post) => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
            dataContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();
