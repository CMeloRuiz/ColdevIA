const processObserver =
new IntersectionObserver(

(entries) => {

    entries.forEach(
        (entry) => {

            if(
                entry.isIntersecting
            ){

                entry.target
                    .classList
                    .add("show");

            }
        }
    );

},
{
    threshold: .2
});

document
.querySelectorAll(
    ".reveal-process"
)
.forEach(
    (el) =>
        processObserver
            .observe(el)
);