document.documentElement.style.scrollBehavior = "smooth";

const sections = document.querySelectorAll(".service-block");
const navLinks = document.querySelectorAll(".services-quicknav a");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => link.classList.remove("active"));
                const activeLink = document.querySelector(
                    `.services-quicknav a[href="#${entry.target.id}"]`
                );
                if (activeLink) activeLink.classList.add("active");
            }
        });
    },
    { rootMargin: "-40% 0px -50% 0px" }
);

sections.forEach((section) => observer.observe(section));