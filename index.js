document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector(".carousel");
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const wrapper = document.querySelector(".wrapper");

    const firstCard = carousel.querySelector(".card");
    const firstCardWidth = firstCard.offsetWidth;

    let isDragging = false,
        startX,
        startScrollLeft,
        timeoutId;

    const dragStart = (e) => { 
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragging) return;
    
        // Calculate the new scroll position
        const newScrollLeft = startScrollLeft - (e.pageX - startX);
    
        // Check if the new scroll position exceeds 
        // the carousel boundaries
        if (newScrollLeft <= 0 || newScrollLeft >= 
            carousel.scrollWidth - carousel.offsetWidth) {
            
            // If so, prevent further dragging
            isDragging = false;
            return;
        }
    
        // Otherwise, update the scroll position of the carousel
        carousel.scrollLeft = newScrollLeft;
    };

    const dragStop = () => {
        isDragging = false; 
        carousel.classList.remove("dragging");
    };

    const autoPlay = () => {
    
        // Return if window is smaller than 800
        if (window.innerWidth < 800) return; 
        
        // Calculate the total width of all cards
        const totalCardWidth = carousel.scrollWidth;
        
        // Calculate the maximum scroll position
        const maxScrollLeft = totalCardWidth - carousel.offsetWidth;
        
        // If the carousel is at the end, stop autoplay
        if (carousel.scrollLeft >= maxScrollLeft) return;
        
        // Autoplay the carousel after every 2500ms
        timeoutId = setTimeout(() => 
            carousel.scrollLeft += firstCardWidth, 2500);
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    wrapper.addEventListener("mouseenter", () => 
        clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);

    // Add event listeners for the arrow buttons to 
    // scroll the carousel left and right
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id === "left" ? 
                -firstCardWidth : firstCardWidth;
        });
    });
});


// Blog JavaScript

document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".blogcarousel");
    const arrowBtns = document.querySelectorAll(".blogwrapper i");
    const wrapper = document.querySelector(".blogwrapper");

    const firstCard = carousel.querySelector(".blogcard");
    const firstCardWidth = firstCard.offsetWidth;

    let isDragging = false,
        startX,
        startScrollLeft,
        timeoutId;

    // Drag start
    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX || e.touches[0].pageX; // Support for touch devices
        startScrollLeft = carousel.scrollLeft;
    };

    // Dragging
    const dragging = (e) => {
        if (!isDragging) return;
        const currentX = e.pageX || e.touches[0].pageX;
        const newScrollLeft = startScrollLeft - (currentX - startX);

        // Prevent scrolling beyond bounds
        if (newScrollLeft <= 0 || newScrollLeft >= carousel.scrollWidth - carousel.offsetWidth) {
            isDragging = false;
            return;
        }

        carousel.scrollLeft = newScrollLeft;
    };

    // Drag stop
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };

    // Auto-play functionality
    const autoPlay = () => {
        if (window.innerWidth < 800) return;

        // Calculate total scrollable width and maximum scroll position
        const maxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;

        // If at the end, reset scroll position
        if (carousel.scrollLeft >= maxScrollLeft) return;

        // Auto-scroll after 2500ms
        timeoutId = setTimeout(() => {
            carousel.scrollLeft += firstCardWidth;
            autoPlay();
        }, 2500);
    };

    // Event listeners
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);

    carousel.addEventListener("touchstart", dragStart);
    carousel.addEventListener("touchmove", dragging);
    document.addEventListener("touchend", dragStop);

    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);

    // Arrow button functionality
    arrowBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const scrollAmount = btn.id === "left" ? -firstCardWidth : firstCardWidth;
            carousel.scrollLeft += scrollAmount;
        });
    });

    // Start autoplay on page load
    autoPlay();
});
