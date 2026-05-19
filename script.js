const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const topBtn = document.getElementById("topBtn");
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll("section");
const reveals = document.querySelectorAll(".reveal");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  const icon = menuBtn.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");

    const icon = menuBtn.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
  });
});

// Typing effect
const typingText = document.querySelector(".typing-text");
const roles = ["Researcher", "Teacher", "Front-End Developer"];

let roleIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];

  if (deleting) {
    typingText.textContent = currentRole.substring(0, letterIndex--);
  } else {
    typingText.textContent = currentRole.substring(0, letterIndex++);
  }

  if (!deleting && letterIndex === currentRole.length + 1) {
    deleting = true;
    setTimeout(typeRole, 1200);
    return;
  }

  if (deleting && letterIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeRole, deleting ? 65 : 115);
}

typeRole();

window.addEventListener("scroll", () => {
  // Take me to top button
  if (window.scrollY > 420) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }

  // Active navbar link
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 130;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");

    if (item.getAttribute("href") === `#${currentSection}`) {
      item.classList.add("active");
    }
  });

  // Reveal animation
  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const revealTop = element.getBoundingClientRect().top;
    const revealPoint = 120;

    if (revealTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
});

window.dispatchEvent(new Event("scroll"));

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Demo contact form
const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Thank you! Your message has been submitted.");
  contactForm.reset();
});
