class BlogManager {
    constructor() {
        this.apiUrl = 'https://api.vers1on.online';
        this.postsContainer = document.getElementById('blog-posts');
    }

    async fetchPosts() {
        try {
            const response = await fetch(`${this.apiUrl}/jsonapi/node/article`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                },
                mode: 'cors'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Fetched data:', data); // Debug log
            return data.data;
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            this.showError('Failed to load blog posts. Please try again later.');
            return [];
        }
    }

    createPostCard(post) {
        const date = new Date(post.attributes.created).toLocaleDateString();
        const title = post.attributes.title;
        const body = post.attributes.body?.value || 'No content available';
        
        return `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title text-dark">${title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${date}</h6>
                        <p class="card-text text-dark">${body}</p>
                        <a href="${this.apiUrl}/node/${post.attributes.drupal_internal__nid}" 
                           class="btn btn-primary" target="_blank">
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    showError(message) {
        this.postsContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger text-center" role="alert">
                    ${message}
                </div>
            </div>
        `;
    }

    async displayPosts() {
        try {
            const posts = await this.fetchPosts();
            console.log('Processing posts:', posts); // Debug log

            if (!posts || posts.length === 0) {
                this.postsContainer.innerHTML = `
                    <div class="col-12 text-center">
                        <p>No blog posts found.</p>
                    </div>
                `;
                return;
            }

            this.postsContainer.innerHTML = posts.map(post => this.createPostCard(post)).join('');
        } catch (error) {
            console.error('Error in displayPosts:', error);
            this.showError('Error displaying posts');
        }
    }
}

// Initialize and load blog posts when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing BlogManager'); // Debug log
    const blogManager = new BlogManager();
    blogManager.displayPosts();
});
