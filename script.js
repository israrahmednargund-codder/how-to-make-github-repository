document.addEventListener("DOMContentLoaded", function () {

    /* ==============================
       READING PROGRESS BAR
       ============================== */

    const progressBar = document.createElement("div");

    progressBar.id = "reading-progress";

    document.body.prepend(progressBar);


    function updateProgress() {

        const scrollTop = window.scrollY;

        const pageHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        if (pageHeight <= 0) {
            progressBar.style.width = "0%";
            return;
        }

        const progress = (scrollTop / pageHeight) * 100;

        progressBar.style.width = progress + "%";
    }


    window.addEventListener("scroll", updateProgress);

    updateProgress();


    /* ==============================
       BACK TO TOP BUTTON
       ============================== */

    const backToTop = document.createElement("button");

    backToTop.id = "back-to-top";
    backToTop.innerHTML = "↑";

    backToTop.setAttribute("aria-label", "Back to top");
    backToTop.setAttribute("title", "Back to top");

    document.body.appendChild(backToTop);


    window.addEventListener("scroll", function () {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* ==============================
       SMOOTH SCROLLING
       ============================== */

    const links = document.querySelectorAll('a[href^="#"]');


    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* ==============================
       SECTION SCROLL ANIMATION
       ============================== */

    const headings = document.querySelectorAll("article h2");


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("section-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


        headings.forEach(function (heading) {

            observer.observe(heading);

        });

    } else {

        headings.forEach(function (heading) {

            heading.classList.add("section-visible");

        });

    }


    /* ==============================
       COPY CODE BUTTON
       ============================== */

    const codeBlocks = document.querySelectorAll("pre");


    codeBlocks.forEach(function (codeBlock) {

        const button = document.createElement("button");

        button.className = "copy-code";

        button.type = "button";

        button.textContent = "Copy";


        codeBlock.appendChild(button);


        button.addEventListener("click", async function () {

            const code = codeBlock.querySelector("code");


            if (!code) {
                return;
            }


            const codeText = code.innerText;


            try {

                await navigator.clipboard.writeText(codeText);

                button.textContent = "Copied ✓";


                setTimeout(function () {

                    button.textContent = "Copy";

                }, 1500);


            } catch (error) {

                button.textContent = "Failed";


                setTimeout(function () {

                    button.textContent = "Copy";

                }, 1500);

            }

        });

    });


    /* ==============================
       IMAGE FADE-IN
       ============================== */

    const images = document.querySelectorAll("img");


    images.forEach(function (image) {

        image.addEventListener("load", function () {

            image.classList.add("image-loaded");

        });


        if (image.complete) {

            image.classList.add("image-loaded");

        }

    });


    /* ==============================
       PAGE LOAD ANIMATION
       ============================== */

    document.body.classList.add("page-loaded");

});