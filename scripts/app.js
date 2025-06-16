document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap components
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Update open/closed status
    function updateClinicStatus() {
        const now = new Date();
        const currentDay = now.getDay();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        
        // Clinic hours: 4:30 PM to 7:00 PM (16:30 to 19:00)
        const openingHour = 16;
        const openingMinute = 30;
        const closingHour = 19;
        
        const isWeekday = currentDay >= 1 && currentDay <= 6;
        const isOpen = isWeekday && 
                      (currentHour > openingHour || 
                      (currentHour === openingHour && currentMinute >= openingMinute)) && 
                      currentHour < closingHour;
        
        const statusElement = document.querySelector('.status-indicator');
        if (statusElement) {
            statusElement.textContent = isOpen ? 'Currently Open' : 'Currently Closed';
            statusElement.classList.toggle('open', isOpen);
            statusElement.classList.toggle('closed', !isOpen);
        }

        // Highlight current day in schedule using Bootstrap classes
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDayName = days[currentDay];
        const dayElements = document.querySelectorAll('.hours-card p');
        
        dayElements.forEach(element => {
            if (element.textContent.includes(currentDayName)) {
                element.classList.add('fw-bold', 'text-primary');
            } else {
                element.classList.remove('fw-bold', 'text-primary');
            }
        });
    }
    
    // Initialize and update every minute
    updateClinicStatus();
    setInterval(updateClinicStatus, 60000);

    // Service card interactions
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('shadow-lg');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('shadow-lg');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});