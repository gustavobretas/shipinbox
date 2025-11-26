// Countdown Timer
function updateCountdown() {
  // Set launch date to 30 days from now
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);

  const now = new Date().getTime();
  const distance = launchDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0"
  );
  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0"
  );
}

// Update countdown every second
// setInterval(updateCountdown, 1000);
// updateCountdown();

// Scroll Reveal Animation
function revealOnScroll() {
  const reveals = document.querySelectorAll(".scroll-reveal");

  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    const revealPoint = 50;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("revealed");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Email Subscription with Mailchimp Integration
function subscribeEmail(inputId) {
  const emailInput = document.getElementById(inputId);
  const email = emailInput.value.trim();

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    showErrorModal("Email Required", "Please enter your email address.");
    emailInput.focus();
    return;
  }

  if (!emailRegex.test(email)) {
    showErrorModal("Invalid Email", "Please enter a valid email address.");
    emailInput.focus();
    return;
  }

  // Mailchimp integration - using endpoint from index2.html
  const mailchimpUrl =
    "https://shipinbox.us4.list-manage.com/subscribe/post?u=9710e9e62fff8ceb4a88eca08&id=72909521e5&f_id=00c66eeaf0";

  // Disable button to prevent double submission
  const button = emailInput.parentElement.querySelector("button");
  const originalButtonText = button.innerHTML;
  button.disabled = true;
  button.innerHTML = "Subscribing...";

  // Submit to Mailchimp using JSONP (cross-domain workaround)
  const jsonpUrl =
    mailchimpUrl.replace("/post?", "/post-json?") +
    "&EMAIL=" +
    encodeURIComponent(email) +
    "&c=mailchimpCallback";

  // Create callback function
  window.mailchimpCallback = function (data) {
    // Re-enable button
    button.disabled = false;
    button.innerHTML = originalButtonText;

    if (data.result === "success") {
      // Clear input
      emailInput.value = "";

      // Show success modal
      showModal();

      // Store locally for tracking
      const emails = JSON.parse(
        localStorage.getItem("shipinbox_emails") || "[]"
      );
      if (!emails.includes(email)) {
        emails.push(email);
        localStorage.setItem("shipinbox_emails", JSON.stringify(emails));
      }

      console.log("✅ Email subscribed successfully:", email);
      console.log("Total subscribers:", emails.length);
    } else {
      // Handle error
      let message = data.msg || "Subscription failed. Please try again.";
      // Clean up Mailchimp error messages (remove HTML and number prefixes)
      message = message.replace(/0 - /g, "").replace(/<[^>]*>/g, "");

      if (message.includes("already subscribed")) {
        showErrorModal(
          "Already Subscribed",
          "This email is already on our waitlist!"
        );
      } else {
        showErrorModal("Subscription Failed", message);
      }
      console.error("❌ Mailchimp error:", data);
    }

    // Clean up script
    document.getElementById("mailchimp-script")?.remove();
  };

  // Create and inject script tag for JSONP request
  const script = document.createElement("script");
  script.id = "mailchimp-script";
  script.src = jsonpUrl;
  document.body.appendChild(script);
}

// Modal Functions
function showModal() {
  const modal = document.getElementById("success-modal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("success-modal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

function showErrorModal(title, message) {
  const modal = document.getElementById("error-modal");
  const titleElement = document.getElementById("error-title");
  const messageElement = document.getElementById("error-message");

  titleElement.textContent = title;
  messageElement.textContent = message;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeErrorModal() {
  const modal = document.getElementById("error-modal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Close modals when clicking outside
document
  .getElementById("success-modal")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      closeModal();
    }
  });

document.getElementById("error-modal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeErrorModal();
  }
});

// Close modals with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
    closeErrorModal();
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.boxShadow = "0 2px 20px rgba(15, 23, 42, 0.1)";
  } else {
    navbar.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});

// Form submission with Enter key
document
  .querySelectorAll(".email-input, .email-input-large")
  .forEach((input) => {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        const button = this.parentElement.querySelector("button");
        if (button) {
          button.click();
        }
      }
    });
  });

// Initialize animations on load
document.addEventListener("DOMContentLoaded", () => {
  // Trigger initial reveal
  setTimeout(revealOnScroll, 50);

  // Add floating animation variation
  const floatingBoxes = document.querySelectorAll(".floating-box");
  floatingBoxes.forEach((box, index) => {
    box.style.animationDelay = `${index * 0.5}s`;
  });
});

// Performance optimization - Throttle scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply throttle to scroll handler
const throttledReveal = throttle(revealOnScroll, 50);
window.removeEventListener("scroll", revealOnScroll);
window.addEventListener("scroll", throttledReveal);
