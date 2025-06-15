// main.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    // Refinement: Add easing for smoother transitions
    AOS.init({
        duration: 1200, // Slightly longer duration for a softer feel
        once: true,     // Animation happens only once
        easing: 'ease-in-out', // Smooth acceleration and deceleration
    });

    // Initialize Typed.js
    const typedElement = document.getElementById('typed');
    if (typedElement) {
        new Typed('#typed', {
            strings: [
                'a Software Developer',
                'a Full-Stack Developer', // Removed trailing dot for consistency
                'a Problem Solver',
                'a Designer',
                'a Programmer' // Capitalized for consistency
            ],
            typeSpeed: 200,
            backSpeed: 80,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            // Refinement: Add smartBackspace for more natural backspacing
            smartBackspace: true,
        });
    }

    // Mobile Menu Toggling
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuButton && mobileMenu && closeMobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });

        closeMobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
        });

        // Close mobile menu when a link is clicked
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = ''; // Restore scrolling
            });
        });
    }

    // --- Three.js Background Animation ---
    const canvas = document.getElementById('three-canvas');
    if (canvas) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true, // For transparent background
            antialias: true // Refinement: Improves edge smoothness of particles
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Refinement: Cap pixel ratio for performance on super high-res screens

        // Helper function to create a circular texture using a Canvas
        function createCircleTexture(size = 128) { // Default size to 128 for better quality
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const context = canvas.getContext('2d');

            context.beginPath();
            context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
            context.fillStyle = 'white';
            context.fill();

            return new THREE.CanvasTexture(canvas);
        }

        const circleTexture = createCircleTexture(128); // Generate the texture once

        // Refinement: Particle material with a subtle color shift and reduced size for a softer look
        const particleMaterial = new THREE.PointsMaterial({
            color: new THREE.Color(0xADD8E6), // Light Blue for a softer, more professional feel
            size: 0.3, // Slightly smaller particles for better density and less clutter
            transparent: true,
            opacity: 0.6, // Slightly reduced opacity
            blending: THREE.AdditiveBlending, // For glowing effect
            depthWrite: false, // Prevent depth issues
            map: circleTexture, // Use the generated circular texture
            alphaTest: 0.001 // Important for correct transparency rendering
        });

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000; // Refinement: Increased particle count for a denser, richer effect
        const posArray = new Float32Array(particlesCount * 3); // x, y, z for each particle
        const sizesArray = new Float32Array(particlesCount); // For individual particle size (optional, but good for variation)

        for (let i = 0; i < particlesCount; i++) {
            posArray[i * 3] = (Math.random() - 0.5) * 200; // Spread across a larger area
            posArray[i * 3 + 1] = (Math.random() - 0.5) * 200;
            posArray[i * 3 + 2] = (Math.random() - 0.5) * 200;

            sizesArray[i] = Math.random() * 0.5 + 0.1; // Random sizes for variation (0.1 to 0.6)
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        // If you want individual particle sizes, you'd need a custom shader or PointsMaterial with vertex colors
        // For now, we'll stick to the uniform size from particleMaterial.size for simplicity with PointsMaterial.

        const particleMesh = new THREE.Points(particlesGeometry, particleMaterial);
        scene.add(particleMesh);

        camera.position.z = 50;

        // Mouse interaction variables
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0; // Using targetX and targetY for smoother camera follow
        let targetY = 0;

        document.addEventListener('mousemove', (event) => {
            targetX = (event.clientX / window.innerWidth) * 2 - 1;
            targetY = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        const animate = () => {
            requestAnimationFrame(animate);

            // Smoothly move camera based on mouse position
            // Refinement: Use lerp (linear interpolation) for smoother camera movement
            camera.position.x += (targetX * 10 - camera.position.x) * 0.02; // Slower, smoother follow
            camera.position.y += (targetY * 10 - camera.position.y) * 0.02;

            // Refinement: Slightly faster and more noticeable rotation
            particleMesh.rotation.x += 0.0008;
            particleMesh.rotation.y += 0.0012;

            // Refinement: More natural particle movement (e.g., oscillating or subtle drift)
            const positions = particlesGeometry.attributes.position.array;
            for (let i = 0; i < particlesCount; i++) {
                // Example: make particles float upwards slowly and oscillate slightly
                positions[i * 3 + 1] += 0.005 + Math.sin(Date.now() * 0.0001 + i) * 0.002; // Subtle oscillation
                positions[i * 3 + 0] += Math.cos(Date.now() * 0.0001 + i) * 0.001; // Subtle horizontal drift

                // Reset if too high or too far
                if (positions[i * 3 + 1] > 100) {
                    positions[i * 3 + 1] = -100;
                }
                if (positions[i * 3] > 100 || positions[i * 3] < -100) {
                    positions[i * 3] = (Math.random() - 0.5) * 200;
                }
            }
            particlesGeometry.attributes.position.needsUpdate = true; // Tell Three.js to update vertex positions

            renderer.render(scene, camera);
        };

        animate();

        // Handle window resizing
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Re-apply pixel ratio on resize
        });
    }
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Refinement: Offset scroll for fixed headers if any
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // Adjust this value if you have a fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});