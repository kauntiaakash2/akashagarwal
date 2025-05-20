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
animateCounter("hackathons", 0, 2, 2000);
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
