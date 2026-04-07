// Header Section
const sections = document.querySelectorAll("#home, #about, #portfolio, #service, #contact");
const navLinks = document.querySelectorAll(".menu a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});


navLinks.forEach((link) => {
  link.addEventListener("click", () => {

    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    const sidebar = document.getElementById("sidebar");
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(sidebar);

    if (bsOffcanvas) {
      bsOffcanvas.hide();
    }
  });
});


// Main Section
const words = [
  "Frontend Developer",
  "UI/UX Enthusiast",
  "React Developer",
  "Web Designer",
  "Creative Coder",
];

let i = 0;
let j = 0;
let isDeleting = false;

const speed = 150;
const eraseSpeed = 60;
const delay = 1500;

function typeEffect() {
  let currentWord = words[i];
  let displayText;

  if (isDeleting) {
    displayText = currentWord.substring(0, j--);
  } else {
    displayText = currentWord.substring(0, j + 1);
    j++;
  }

  document.getElementById("type").textContent = displayText;

  if (!isDeleting && j === currentWord.length) {
    isDeleting = true;
    setTimeout(typeEffect, delay);
    return;
  }

  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % words.length;
  }

  setTimeout(typeEffect, isDeleting ? eraseSpeed : speed);
}

typeEffect();

// Scroll btn
document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.getElementById("scrollTop");

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "flex" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// About Section
const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  const update = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;

    const speed = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + speed);
      setTimeout(update, 20);
    } else {
      counter.innerText = target + "+";
    }
  };

  update();
});

// Reveal Scroll
const reveals = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

// State Section
const stats = document.querySelectorAll(".stat-card h2");

stats.forEach((stat) => {
  let target = +stat.innerText;
  let count = 0;

  const update = () => {
    count += Math.ceil(target / 70);
    if (count < target) {
      stat.innerText = count;
      setTimeout(update, 30);
    } else {
      stat.innerText = target;
    }
  };

  update();
});

// Skill Section
const skillSection = document.querySelector(".skill");
const skillBars = document.querySelectorAll(".skill-fill");

let started = false;

function animateSkills() {
  const sectionTop = skillSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight - 100 && !started) {
    skillBars.forEach((bar) => {
      const width = bar.getAttribute("data-width");
      bar.style.width = width;
    });

    started = true; // run only once
  }
}

window.addEventListener("scroll", animateSkills);

// Project Section
const section = document.querySelector(".projects");
const wrapper = document.querySelector(".projects-wrapper");
const track = document.querySelector(".projects-track");

function getMaxScroll() {
  return track.scrollWidth - wrapper.clientWidth;
}

function setSectionHeight() {

  if (window.innerWidth <= 992) {
    section.style.height = "auto";
    return;
  }

  const maxScroll = getMaxScroll();
  const startOffset = 150;  

  section.style.height = `${window.innerHeight + maxScroll + startOffset}px`;
}

function handleScroll() {

  if (window.innerWidth <= 992) return;

  const rect = section.getBoundingClientRect();
  const scrollY = Math.abs(rect.top);

  const maxScroll = getMaxScroll();
  const startOffset = 150;

  if (rect.top <= 0 && scrollY >= startOffset && scrollY <= maxScroll + startOffset) {

    const moveX = scrollY - startOffset;

    track.style.transform = `translateX(-${Math.min(moveX, maxScroll)}px)`;

  } else if (scrollY < startOffset) {

    track.style.transform = `translateX(0px)`;

  } else {

    track.style.transform = `translateX(-${maxScroll}px)`;
  }
}

setSectionHeight();
handleScroll();

window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", setSectionHeight);