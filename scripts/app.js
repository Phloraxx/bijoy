document.addEventListener('DOMContentLoaded', function() {
    // Update open/closed status
    function updateClinicStatus() {
        const now = new Date();
        const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        
        // Clinic hours: 4:30 PM to 7:00 PM (16:30 to 19:00)
        const openingHour = 16;
        const openingMinute = 30;
        const closingHour = 19;
        
        const isWeekday = currentDay >= 1 && currentDay <= 6; // Monday-Saturday
        const isOpen = isWeekday && 
                      (currentHour > openingHour || 
                      (currentHour === openingHour && currentMinute >= openingMinute)) && 
                      currentHour < closingHour;
        
        const statusElement = document.querySelector('.status-indicator');
        if (statusElement) {
            statusElement.textContent = isOpen ? 'Currently Open' : 'Currently Closed';
            statusElement.className = isOpen ? 'status-indicator open' : 'status-indicator closed';
        }
        
        // Highlight current day in schedule
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDayName = days[currentDay];
        const dayElements = document.querySelectorAll('.hours-card p');
        
        dayElements.forEach(element => {
            if (element.textContent.includes(currentDayName)) {
                element.style.fontWeight = 'bold';
                element.style.color = 'var(--primary)';
            }
        });
    }
    
    // Initialize and update every minute
    updateClinicStatus();
    setInterval(updateClinicStatus, 60000);
    
    // Mobile info bar toggle
    const infoToggle = document.querySelector('.info-toggle');
    const infoContent = document.querySelector('.info-content');
    
    if (infoToggle && infoContent) {
        infoToggle.addEventListener('click', () => {
            if (infoContent.style.display === 'block') {
                infoContent.style.display = 'none';
            } else {
                infoContent.style.display = 'block';
            }
        });
    }

    // Service card animations
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});