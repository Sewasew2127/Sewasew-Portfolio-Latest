// Typewriter Animation
const roles = [
    "Lead Software Developer",
    "DevOps Engineer",
    "Full Stack Developer",
    "Project Manager",
    "Software Architect",
    "Tech Lead"
];

class TypeWriter {
    constructor(textElement, words, waitTime = 3000) {
        this.textElement = textElement;
        this.words = words;
        this.waitTime = waitTime;
        this.txt = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const currentWord = this.words[this.wordIndex];
        
        // Set typing speed
        let typeSpeed = 100;

        if (this.isDeleting) {
            // Remove char
            this.txt = currentWord.substring(0, this.txt.length - 1);
            typeSpeed = 50; // Faster deletion
        } else {
            // Add char
            this.txt = currentWord.substring(0, this.txt.length + 1);
        }

        // Output the text
        this.textElement.textContent = this.txt;

        // If word is complete
        if (!this.isDeleting && this.txt === currentWord) {
            typeSpeed = this.waitTime; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize Typewriter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.querySelector('.typewriter-text');
    new TypeWriter(textElement, roles);
});

// Navigation hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Sample projects data
const projects = [
    {
        title: 'Project 1',
        description: 'A brief description of project 1 and its key features.',
        image: 'https://via.placeholder.com/300x200',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        link: '#'
    },
    {
        title: 'Project 2',
        description: 'A brief description of project 2 and its key features.',
        image: 'https://via.placeholder.com/300x200',
        technologies: ['React', 'Node.js'],
        link: '#'
    },
    {
        title: 'Project 3',
        description: 'A brief description of project 3 and its key features.',
        image: 'https://via.placeholder.com/300x200',
        technologies: ['Python', 'Django'],
        link: '#'
    }
];

// Populate projects
const projectGrid = document.querySelector('.project-grid');

projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    
    projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-image">
        <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="skill-tags">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
            <a href="${project.link}" class="cta-button" style="margin-top: 1rem;">View Project</a>
        </div>
    `;
    
    projectGrid.appendChild(projectCard);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
        }
    });
});

// Add scroll animation for elements
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
});

// Animate skill bars when they come into view
const animateSkills = () => {
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = `${progress}%`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillProgressBars.forEach(bar => {
        observer.observe(bar);
        bar.style.width = '0%';
    });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateSkills();
});

// Re-run animations when navigating back to the page
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        animateSkills();
    }
});
