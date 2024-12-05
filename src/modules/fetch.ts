import { Post, FetchResponse, HTMLElementType } from '../types/typese';

const dataContainer: HTMLElementType = document.getElementById('data-container') as HTMLElementType;

// Функція для отримання даних з API
export async function fetchData(): Promise<void> {
    try {
        const response: Response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data: FetchResponse = await response.json();

        data.slice(0, 5).forEach((post: Post) => {
            const postElement: HTMLElementType = document.createElement('div');
            postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
            dataContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
