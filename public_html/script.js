// Smooth Scroll to Footer Form
document.getElementById('scrollToForm').addEventListener('click', () => {
  document.querySelector('#emailForm').scrollIntoView({ behavior: 'smooth' });
});

// Toggle Clothing Store Products
document.getElementById('showProducts').addEventListener('click', () => {
  const products = document.getElementById('products');
  products.classList.toggle('hidden');
});

// Email Form Validation
document.getElementById('emailForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const emailInput = document.getElementById('email').value;
  const formMessage = document.getElementById('formMessage');

  if (validateEmail(emailInput)) {
    formMessage.style.color = 'green';
    formMessage.textContent = 'Thank you for subscribing!';
  } else {
    formMessage.style.color = 'red';
    formMessage.textContent = 'Please enter a valid email.';
  }
});

// Validate Email Format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Image Slider for Events
let currentIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slides img').length;

setInterval(() => {
  currentIndex = (currentIndex + 1) % totalSlides;
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}, 3000);

// Fetch Blog Posts Function
async function fetchPosts() {
  const container = document.getElementById('blogContainer');
  try {
    const response = await fetch('https://vers1on.online');
    const data = await response.json();

    container.innerHTML = ""; // Clear container
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
    container.innerHTML = `<p style="color:red;">Failed to load blog posts. Please try again later.</p>`;
  }
}

// Call fetchPosts on Page Load
document.addEventListener('DOMContentLoaded', () => {
  fetchPosts();
});
