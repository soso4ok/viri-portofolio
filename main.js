document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Intersection Observer for standard scroll reveals
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    let animationPlayed = false;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // 2. Trigger anime.js for the specific process block when it comes into view
                if (entry.target.querySelector('.process-loop') && !animationPlayed) {
                    playProcessAnimation();
                    animationPlayed = true; // only play once
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
    });

    // 3. Creative Anime.js Text Animation (Kinetic Typography)
    function playProcessAnimation() {
        const processLoop = document.querySelector('.process-loop');
        if (!processLoop) return;

        // Split words into letters for stagger effect
        const words = document.querySelectorAll('.process-word');
        words.forEach(word => {
            word.innerHTML = word.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        });

        // Set initial state
        anime.set('.process-loop .letter', { opacity: 0, translateY: '1em' });
        anime.set('.process-arrow', { opacity: 0, scale: 0.5, translateX: '-1em' });

        // Create timeline for professional kinetic motion
        const tl = anime.timeline({
            easing: 'easeOutExpo'
        });

        tl.add({
            targets: '.process-loop .letter',
            translateY: ['1em', 0],
            opacity: [0, 1],
            duration: 900,
            delay: anime.stagger(40, { start: 300 })
        })
        .add({
            targets: '.process-arrow',
            opacity: [0, 1],
            scale: [0.5, 1],
            translateX: ['-1em', 0],
            duration: 800,
            delay: anime.stagger(200)
        }, '-=800')
        // Color pulse effect to emphasize the "Receive -> Analyse -> Judge" flow
        .add({
            targets: '.process-word',
            color: ['#E8E4DF', '#E85D50'], // White to Accent
            duration: 600,
            easing: 'easeInOutSine',
            delay: anime.stagger(600),
            direction: 'alternate',
            loop: 1
        }, '+=200');
    }
});
