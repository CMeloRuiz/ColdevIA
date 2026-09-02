const whyVortexObserver  =
    new IntersectionObserver(

    (entries) => {

        entries.forEach(
            (entry) => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target
                        .classList
                        .add("show");

                    whyVortexObserver
                        .unobserve(
                            entry.target
                        );
                }
            }
        );

    },
    {
        threshold: 0.3
    }
);

document
    .querySelectorAll(".reveal")
    .forEach(
        (element) => {
            console.log(element);
            whyVortexObserver.observe(
                element
            );

        }
    );