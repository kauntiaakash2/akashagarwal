// Array of inspirational quotes
const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Excellence is not a destination; it is a continuous journey that never ends.", author: "Brian Tracy" },
  { text: "Your limitation—it's only your imagination.", author: "Unknown" },
];

// Function to get random quote
function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// Function to display a quote
function displayQuote() {
  const quote = getRandomQuote();
  const quoteTextEl = document.getElementById("quoteText");
  const quoteAuthorEl = document.getElementById("quoteAuthor");
  
  if (quoteTextEl && quoteAuthorEl) {
    // Fade out effect
    quoteTextEl.style.opacity = "0.5";
    quoteTextEl.style.transform = "scale(0.95)";
    
    setTimeout(() => {
      quoteTextEl.textContent = `"${quote.text}"`;
      quoteAuthorEl.textContent = `— ${quote.author}`;
      
      // Fade in effect
      quoteTextEl.style.opacity = "1";
      quoteTextEl.style.transform = "scale(1)";
    }, 300);
  }
}

// Display initial quote on page load
document.addEventListener("DOMContentLoaded", () => {
  displayQuote();
  
  // Change quote every 7 seconds
  setInterval(displayQuote, 60000);
});

// Add transition styles for quote
const quoteText = document.getElementById("quoteText");
if (quoteText) {
  quoteText.style.transition = "opacity 0.3s ease, transform 0.3s ease";
}

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  const hero = document.getElementById("hero");
  const heroBottom = hero.offsetHeight;

  if (window.scrollY < heroBottom - 50) {
    header.classList.add("transparent");
  } else {
    header.classList.remove("transparent");
  }
});

// Trigger on load
window.dispatchEvent(new Event("scroll"));

// Skill
const skillSection = document.querySelector("#skills");
const progressBars = document.querySelectorAll(".progress");

const showProgress = () => {
  progressBars.forEach((bar) => {
    const value = bar.getAttribute("data-value");

    if (!bar.classList.contains("animated")) {
      bar.style.width = value;
      bar.classList.add("animated"); // Mark as animated
    }
  });
};

window.addEventListener("scroll", () => {
  const sectionPos = skillSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.3;

  if (sectionPos < screenPos) {
    showProgress();
  }
});

// Project
const projectSection = document.querySelector("#projects");
const projectCards = document.querySelectorAll(".project-card");

const revealProjects = () => {
  projectCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("visible");
    }, index * 150); // Staggered animation
  });
};

window.addEventListener("scroll", () => {
  const sectionPos = projectSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.3;

  if (sectionPos < screenPos) {
    revealProjects();
  }
});

// Counter Animation
const animateCounter = (id, start, end, duration) => {
  let current = start;
  const range = end - start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));
  const obj = document.getElementById(id);

  const timer = setInterval(() => {
    current += increment;
    obj.textContent = current;
    if (current === end) {
      clearInterval(timer);
    }
  }, stepTime);
};

// Initialize Counters
animateCounter("hackathons", 0, 5, 2000);
animateCounter("project", 0, 3, 2000);

// Time Counter
let seconds = 0;
const timeSpent = document.getElementById("timeSpent");
setInterval(() => {
  seconds++;
  timeSpent.textContent = seconds;
}, 1000);

// Back to top
document.querySelectorAll('a[href="#top"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Typed.js Animation
if (document.getElementById("typed")) {
  const typed = new Typed("#typed", {
    strings: [
      "ML Intern",
      "Full-Stack Developer",
      "Competitive Programmer",
      "AI/ML Enthusiast"
    ],
    typeSpeed: 80,
    backSpeed: 60,
    backDelay: 1500,
    loop: true,
    cursorChar: "|"
  });
}

// Project Image Auto-Loader with Multiple Fallbacks
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const IMAGE_CACHE_KEY = "projectImageCache";

function generateImageUrl(keywords, attempt = 0) {
  // Multiple image source options for reliability
  const imageSources = [
    // Picsum (reliable, CORS-friendly)
    `https://picsum.photos/800/600?random=${Date.now() + attempt}`,
    // LoremFlickr (also reliable)
    `https://loremflickr.com/800/600?lock=${Date.now() + attempt}`,
    // DummyImage as final fallback
    `https://dummyimage.com/800x600/6a4bff/ffffff?text=${keywords.split(',')[0]}`
  ];
  
  return imageSources[attempt % imageSources.length];
}

function getPlaceholderColor(index) {
  const colors = ["#6a4bff", "#4ecdc4", "#ffa502", "#ff6b6b", "#2dd4bf"];
  return colors[index % colors.length];
}

function createGradientPlaceholder(keywords, index) {
  // Create a gradient placeholder as fallback
  const color1 = getPlaceholderColor(index);
  const color2 = getPlaceholderColor(index + 1);
  const heading = keywords.split(',')[0];
  
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 800, 600);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 800, 600);
  
  // Add text
  ctx.fillStyle = 'white';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(heading, 400, 250);
  
  ctx.font = '24px Arial';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fillText('Project Image Loading...', 400, 350);
  
  return canvas.toDataURL('image/png');
}

function loadProjectImages() {
  const projectCards = document.querySelectorAll(".project-card");
  const cachedImages = JSON.parse(localStorage.getItem(IMAGE_CACHE_KEY) || "{}");
  const now = Date.now();

  projectCards.forEach((card, index) => {
    const img = card.querySelector(".project-img");
    const keywords = card.getAttribute("data-image-keywords");
    
    if (!img || !keywords) return;

    // Check cache first
    const cacheKey = keywords;
    if (cachedImages[cacheKey] && (now - cachedImages[cacheKey].timestamp) < CACHE_EXPIRY) {
      img.src = cachedImages[cacheKey].url;
      console.log("Image loaded from cache:", cacheKey);
      return;
    }

    // Try different image sources with retry logic
    let attempt = 0;
    const maxAttempts = 3;
    
    function tryLoadImage() {
      if (attempt >= maxAttempts) {
        // All attempts failed, use gradient placeholder
        const placeholder = createGradientPlaceholder(keywords, index);
        img.src = placeholder;
        console.log("All image sources failed, using gradient placeholder for:", keywords);
        return;
      }

      const imageUrl = generateImageUrl(keywords, attempt);
      const tempImg = new Image();
      
      tempImg.onload = () => {
        img.src = imageUrl;
        // Cache successful image
        cachedImages[cacheKey] = {
          url: imageUrl,
          timestamp: now
        };
        localStorage.setItem(IMAGE_CACHE_KEY, JSON.stringify(cachedImages));
        console.log("Image loaded successfully:", keywords);
      };
      
      tempImg.onerror = () => {
        console.log(`Attempt ${attempt + 1} failed for:`, keywords);
        attempt++;
        tryLoadImage();
      };
      
      tempImg.crossOrigin = "Anonymous";
      tempImg.src = imageUrl;
    }
    
    tryLoadImage();
  });
}

// Load images when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadProjectImages);
} else {
  loadProjectImages();
}
