async function fetchPosts() {
    const container = document.getElementById('blogContainer');
    try {
        const response = await fetch('https://your-drupal-site.com/jsonapi/node/article');
        const data = await response.json();

        container.innerHTML = "";
        data.data.forEach(post => {
            const html = `
                <div class="blog-post">
                    <h3>${post.attributes.title}</h3>
                    <p>${post.attributes.body.value}</p>
                </div>`;
            container.innerHTML += html;
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}
