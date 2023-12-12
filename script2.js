document.addEventListener('DOMContentLoaded', function () {
    let printDialogTriggered = false;

    function checkScrollBottomAndPrint() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const atBottom = (window.innerHeight + scrollTop) >= document.body.offsetHeight - 10; // Slight buffer for bottom check

        if (atBottom) {
            if (!printDialogTriggered) {
                preparePrintLayout();
                printDialogTriggered = true;
            }
        } else {
            printDialogTriggered = false; // Reset the flag when not at bottom
        }
    }

    function preparePrintLayout() {
        // Array of image filenames
        const imageFilenames = ['printv1.png', 'printv2.png', 'printv3.png'];
    
        // Randomly select an index
        const randomIndex = Math.floor(Math.random() * imageFilenames.length);
    
        // Select the image filename based on the random index
        const selectedImage = imageFilenames[randomIndex];
    
        // Update the src attribute of printImage
        const printImage = document.getElementById('printImage');
        printImage.src = selectedImage;
        printImage.style.display = 'block';
    
        // Set a timeout before printing
        setTimeout(function() {
            window.print();
            printImage.style.display = 'none';
        }, 3000); // Delay before print
    }

    window.addEventListener('scroll', checkScrollBottomAndPrint);

    // Reset the print trigger on page load
    window.onload = function() {
        printDialogTriggered = false;
    };

    // Your existing code for video playback, text animation, etc.
    var playbackConstants = [150, 400, 300, 300, 160, 150, 80, 250, 120, 70, 150, 20, 20];
    var vids = ['v0', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'vvv'].map(id => document.getElementById(id));
    var setHeight = document.getElementById("set-height0");

    vids[0].addEventListener('loadedmetadata', function() {
        setHeight.style.height = Math.floor(vids[0].duration) * playbackConstants[0] + "px";
    });

    let lastScrollTop = 0;
    function scrollPlay() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        if (Math.abs(scrollTop - lastScrollTop) > 10) {
            vids.forEach((vid, index) => {
                if (vid && vid.readyState >= 2) {
                    var frameNumber = scrollTop / playbackConstants[index];
                    vid.currentTime = Math.min(frameNumber, vid.duration);
                }
            });
            lastScrollTop = scrollTop;
        }

        window.requestAnimationFrame(scrollPlay);
    }

    window.requestAnimationFrame(scrollPlay);

    const text = document.getElementById('scroll-text');
    const words = text.innerText.split(' ');

    text.innerHTML = '';

    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.transitionDelay = `${index * 300}ms`;
        text.appendChild(span);
    });

    const isInView = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const revealOnScroll = () => {
        document.querySelectorAll('#scroll-text span').forEach(span => {
            if (isInView(span)) {
                span.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
});
