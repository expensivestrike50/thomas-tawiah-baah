document.addEventListener('DOMContentLoaded', () => {

  // =========================================
  // 1. Mobile Nav Toggle
  // =========================================
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.addEventListener("click", (event) => {
      if (event.target.tagName.toLowerCase() === "a") {
        navLinks.classList.remove("open");
      }
    });
  }

  // =========================================
  // 2. Smooth Scroll
  // =========================================
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId.length > 1) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          const headerOffset = 80; 
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  });

  // =========================================
  // 3. Footer Year
  // =========================================
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // =========================================
  // 4. Main Conference Slider (The Cards)
  // =========================================
  const slider = document.querySelector('.conf-slider');

  if (slider) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('conf-wrapper');
    slider.parentNode.insertBefore(wrapper, slider);
    wrapper.appendChild(slider);

    const nextBtn = document.createElement('button');
    nextBtn.classList.add('conf-next-btn');
    nextBtn.innerHTML = '&#10095;'; 
    nextBtn.setAttribute('aria-label', 'Next Slide');
    wrapper.appendChild(nextBtn);

    nextBtn.addEventListener('click', () => {
      const slideWidth = slider.clientWidth;
      const currentScroll = slider.scrollLeft;
      const maxScroll = slider.scrollWidth - slider.clientWidth;

      if (currentScroll >= maxScroll - 10) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: slideWidth, behavior: 'smooth' });
      }
    });
  }

  // =========================================
  // 5. INTERNAL IMAGE AUTO-SCROLL (New Addition)
  // =========================================
  const collages = document.querySelectorAll('.conf-collage');

  collages.forEach(collage => {
    // Set an interval to scroll the images every 3 seconds
    setInterval(() => {
      // 1. Pause if the user is hovering over the images (Better UX)
      if (collage.matches(':hover')) return;

      const maxScroll = collage.scrollWidth - collage.clientWidth;
      const currentScroll = collage.scrollLeft;
      
      // 2. Logic: If at the end, go back to start. Otherwise scroll right.
      // We scroll by 300px which is roughly the width of one image + gap
      if (currentScroll >= maxScroll - 10) {
        collage.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        collage.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }, 3000); // 3000ms = 3 seconds
  });

});
