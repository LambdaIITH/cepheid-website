const mouseTracker = () => {
  const mauser = document.getElementById("mauser")

  // Firefox doesn't support document.onmousemove for some reason
  document.onmouseover = (e) => {
    const interactable = e.target.closest(".interactable"),
      interacting = interactable !== null

    const x = e.clientX - mauser.offsetWidth / 2,
      y = e.clientY - mauser.offsetHeight / 2

    animateTracker(x, y, interacting)
  }
}

const animateTracker = (x, y, interacting) => {
  if (interacting) {
    mauser.classList.add("interacting")
  } else {
    mauser.classList.remove("interacting")
  }

  const keyframes = {
    transform: `translate(${x}px, ${y}px) scale(${interacting ? 3 : 1})`,
  }

  mauser.animate(keyframes, { duration: 400, fill: "forwards" })
}

const highlightActiveMenuItem = () => {
  const sections = document.querySelectorAll(".section");
  const menuItems = document.querySelectorAll('a[href^="#"] h4');

  // Debounce the scroll event for better performance
  let scrollTimeoutId;
  
  const highlightMenu = () => {
    const scrollPosition = window.scrollY;
    
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100; // Offset for header/padding
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      
      // Check if section is in viewport
      if (
        scrollPosition >= sectionTop && 
        scrollPosition < sectionTop + sectionHeight
      ) {
        // Remove active class from all menu items first
        menuItems.forEach((item) => {
          item.classList.remove("active-menu");
        });
        
        // Add active class to current section's menu item
        const activeMenuItem = document.querySelector(`a[href="#${sectionId}"] h4`);
        if (activeMenuItem) {
          activeMenuItem.classList.add("active-menu");
        }
      }
    });
  };

  // Add scroll event listener with debouncing
  window.addEventListener("scroll", () => {
    if (scrollTimeoutId) {
      clearTimeout(scrollTimeoutId);
    }
    scrollTimeoutId = setTimeout(highlightMenu, 100);
  });

  // Call once on page load
  highlightMenu();
};

// Call the function when DOM is ready
document.addEventListener('DOMContentLoaded', highlightActiveMenuItem);

if (document.getElementById("mauser") !== null && window.innerWidth > 768) {
  mouseTracker()
}

if (window.location.pathname === "/") {
  highlightActiveMenuItem()
}
