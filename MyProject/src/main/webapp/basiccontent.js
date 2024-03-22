document.addEventListener('DOMContentLoaded', function () {
        const url = new URL(window.location.href);
        const targetSection = url.hash.substr(2); // Get the anchor without the #

        if (targetSection) {
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                // Scroll to the target section smoothly
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });


