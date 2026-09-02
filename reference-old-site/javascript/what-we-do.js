const tabs = document.querySelectorAll(".service-tab");

const panels = document.querySelectorAll(".service-panel");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(btn =>
            btn.classList.remove("active")
        );
        panels.forEach(panel =>
            panel.classList.remove("active")
        );
        tab.classList.add("active");
        document
            .getElementById(
                tab.dataset.service
            )
            .classList.add("active");
    });
});
