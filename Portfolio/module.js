/* ==================================================
   PAGE LOADER
================================================== */

window.addEventListener("load", () => {

    const pageLoader =
        document.getElementById("page-loader");

    if (pageLoader) {

        setTimeout(() => {

            pageLoader.classList.add("hide");

        }, 1000);

    }

});



/* ==================================================
   NAVBAR ELEMENTS
================================================== */

const navbar =
    document.getElementById("navbar");

const themeToggle =
    document.getElementById("theme-toggle");

const themeIcon =
    document.getElementById("theme-icon");

const menuBtn =
    document.getElementById("menu-btn");

const navMenu =
    document.getElementById("nav-menu");

const navLinks =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll("section[id]");

const downloadCV =
    document.getElementById("download-cv");



/* ==================================================
   DOWNLOAD CV
================================================== */

if (downloadCV) {

    downloadCV.addEventListener("click", (event) => {

        event.preventDefault();

        const link =
            document.createElement("a");

        link.href =
            "./Resume/Nivetha_Frontend_Developer_Resume.pdf";

        link.download =
            "Nivetha_Frontend_Developer_Resume.pdf";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

    });

}



/* ==================================================
   THEME TOGGLE
================================================== */

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "light") {

    document.documentElement.classList.add(
        "light-theme"
    );

    themeIcon.classList.remove(
        "bi-sun-fill"
    );

    themeIcon.classList.add(
        "bi-moon-fill"
    );

} else {

    document.documentElement.classList.remove(
        "light-theme"
    );

    themeIcon.classList.remove(
        "bi-moon-fill"
    );

    themeIcon.classList.add(
        "bi-sun-fill"
    );

}


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const isLight =
            document.documentElement.classList.toggle(
                "light-theme"
            );


        if (isLight) {

            themeIcon.classList.remove(
                "bi-sun-fill"
            );

            themeIcon.classList.add(
                "bi-moon-fill"
            );

            localStorage.setItem(
                "theme",
                "light"
            );

        } else {

            themeIcon.classList.remove(
                "bi-moon-fill"
            );

            themeIcon.classList.add(
                "bi-sun-fill"
            );

            localStorage.setItem(
                "theme",
                "dark"
            );

        }

    });

}



/* ==================================================
   NAVBAR SCROLL EFFECT
================================================== */

function updateNavbar() {

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    updateNavbar
);

updateNavbar();



/* ==================================================
   ACTIVE NAVIGATION
================================================== */

function updateActiveNav() {

    let currentSection = "home";


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 150;


        if (window.scrollY >= sectionTop) {

            currentSection =
                section.id;

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNav
);

updateActiveNav();



/* ==================================================
   NAV LINK CLICK
================================================== */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.forEach((item) => {

            item.classList.remove("active");

        });


        link.classList.add("active");


        /* Close mobile menu */

        navMenu.classList.remove("active");

        menuBtn.classList.remove("active");

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});



/* ==================================================
   MOBILE MENU
================================================== */

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        const isOpen =
            navMenu.classList.toggle(
                "active"
            );


        menuBtn.classList.toggle(
            "active",
            isOpen
        );


        menuBtn.setAttribute(
            "aria-expanded",
            isOpen
        );

    });

}



/* ==================================================
   HERO SKILLS SCROLLING ANIMATION
================================================== */

const skillsTrack =
    document.querySelector(".skills-track");

const skillsGroup =
    document.querySelector(".skills-group");


let skillsPosition = 0;

const skillsSpeed = 0.3;

let skillsGroupWidth = 0;


function updateSkillsWidth() {

    if (!skillsGroup) return;

    skillsGroupWidth =
        skillsGroup.getBoundingClientRect().width;

}


function animateSkills() {

    if (!skillsTrack || !skillsGroup) return;


    skillsPosition -= skillsSpeed;


    /* Seamless loop */

    if (
        Math.abs(skillsPosition) >=
        skillsGroupWidth
    ) {

        skillsPosition +=
            skillsGroupWidth;

    }


    skillsTrack.style.transform =
        `translate3d(${skillsPosition}px, 0, 0)`;


    requestAnimationFrame(
        animateSkills
    );

}


updateSkillsWidth();

window.addEventListener(
    "resize",
    updateSkillsWidth
);

requestAnimationFrame(
    animateSkills
);



/* ==================================================
   SCROLL REVEAL
================================================== */

const revealSections =
    document.querySelectorAll(
        ".scroll-reveal"
    );


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.01,
            rootMargin: "0px 0px -50px 0px"
        }
    );


revealSections.forEach((section) => {

    revealObserver.observe(section);

});


/* ==================================================
   CONTACT FORM
================================================== */

const contactForm =
    document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const submitButton =
            contactForm.querySelector(".contact-submit");

        const originalText =
            submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.innerHTML = "Sending...";

        try {

            const response = await fetch(
                contactForm.action,
                {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            if (response.ok) {

                contactForm.reset();

                alert(
                    "Your message has been sent successfully."
                );

            } else {

                alert(
                    "Something went wrong. Please try again."
                );
            }

        } catch (error) {

            alert(
                "Unable to send your message. Please try again."
            );

        } finally {

            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }

    });

}


/* ==================================================
   FOOTER REVEAL
================================================== */

const footerReveal =
    document.querySelector(
        ".footer-reveal"
    );


if (footerReveal) {

    const footerObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        footerReveal.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            footerReveal
                        );

                    }

                });

            },
            {
                threshold: 0.1
            }
        );


    footerObserver.observe(
        footerReveal
    );

}



/* ==================================================
   BACK TO TOP
================================================== */

const backToTop =
    document.getElementById(
        "back-to-top"
    );


function updateBackToTop() {

    if (window.scrollY > 400) {

        backToTop.classList.add(
            "show"
        );

    } else {

        backToTop.classList.remove(
            "show"
        );

    }

}


window.addEventListener(
    "scroll",
    updateBackToTop
);


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


updateBackToTop();