// Simple modular progress bar animation
function animateBar(selector, percentage) {
    const bar = document.querySelector(selector);
    if (bar) {
        bar.style.width = percentage + '%';
    }
}

// Animate multiple bars at once
function animateBars(bars) {
    bars.forEach((bar, index) => {
        setTimeout(() => {
            animateBar(bar.selector, bar.percentage);
        }, index * 300); // 300ms delay between each bar
    });
}

// Auto-animate all bars with data-width attribute
function animateAllBars() {
    const progressBars = document.querySelectorAll('.progress-bar[data-width]');
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const percentage = bar.getAttribute('data-width');
            bar.style.width = percentage + '%';
        }, index * 300);
    });
}

// Trigger animations when page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        animateAllBars();
    }, 1000);
});

// Manual trigger function
function triggerProgressBars() {
    animateAllBars();
}