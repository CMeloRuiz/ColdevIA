const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

const particles = [];

const mouse = {
    x: null,
    y: null,
    radius: 150
};

const networkTemplate = [
    { x: 0, y: 0 },

    { x: 0, y: -70 },
    { x: 66, y: -25 },
    { x: 50, y: 50 },
    { x: -50, y: 50 },
    { x: -66, y: -25 },

    { x: 0, y: -140 },
    { x: 110, y: -90 },
    { x: 140, y: 0 },
    { x: 110, y: 90 },
    { x: 0, y: 140 },
    { x: -110, y: 90 },
    { x: -140, y: 0 },
    { x: -110, y: -90 },

    { x: 0, y: -210 },
    { x: 150, y: -150 },
    { x: 210, y: 0 },
    { x: 150, y: 150 },
    { x: 0, y: 210 },
    { x: -150, y: 150 },
    { x: -210, y: 0 },
    { x: -150, y: -150 },

    { x: 0, y: -280 },
    { x: 140, y: -240 },
    { x: 240, y: -140 },
    { x: 280, y: 0 },
    { x: 240, y: 140 },
    { x: 140, y: 240 },
    { x: 0, y: 280 },
    { x: -140, y: 240 },
    { x: -240, y: 140 },
    { x: -280, y: 0 },
    { x: -240, y: -140 },
    { x: -140, y: -240 }

];

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

canvas.addEventListener("mousemove", (event) => {
    const rect =
        canvas.getBoundingClientRect();
    mouse.x =
        event.clientX - rect.left;
    mouse.y =
        event.clientY - rect.top;
});

canvas.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
});


const hero =
    document.querySelector(".hero");

let animationActive = true;

const observer =
    new IntersectionObserver((entries) => {

        animationActive =
            entries[0].isIntersecting;

    }, {
        threshold: 0.1
    });

observer.observe(hero);


class Particle {
    constructor(node) {
        this.baseX = node.x;
        this.baseY = node.y;
        this.offset =
            Math.random() * Math.PI * 2;
        this.speed =
            0.003 + Math.random() * 0.003;
        this.isPrimary =
            Math.random() > 0.75;
        this.radius =
            this.isPrimary
                ? 6
                : 3;
    }

    update() {
        const scale = 0.7;
        const centerX =
            canvas.width / 2;
        const centerY =
            canvas.height / 2;
        const time =
            Date.now() * this.speed;
        this.x =
            centerX +
            (this.baseX * scale) +
            Math.cos(time + this.offset) * 3;
        this.y =
            centerY +
            (this.baseY * scale);

        if (mouse.x !== null) {
            const dx =
                mouse.x - this.x;
            const dy =
                mouse.y - this.y;
            const distance =
                Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const force =
                    (mouse.radius - distance) /
                    mouse.radius;
                this.x += dx * force * 0.12;
                this.y += dy * force * 0.12;
            }
        }
    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        let glow = 8;

        if (mouse.x !== null) {

            const dx =
                this.x - mouse.x;

            const dy =
                this.y - mouse.y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {

                glow =
                    20 +
                    (mouse.radius - distance) * 0.15;
            }
        }

        ctx.shadowBlur = glow;

        ctx.shadowColor = "#ffffff";

        ctx.fillStyle = "#ffffff";

        ctx.fill();
    }
}

networkTemplate.forEach((node) => {

    particles.push(
        new Particle(node)
    );

});

function drawConnections() {

    for (let i = 0; i < particles.length; i++) {

        for (let j = i + 1; j < particles.length; j++) {

            const dx =
                particles[i].x -
                particles[j].x;

            const dy =
                particles[i].y -
                particles[j].y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (distance < 130) {

                const opacity =
                    1 - distance / 160;

                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.strokeStyle =
                    `rgba(255,255,255,${opacity * 0.65})`;

                ctx.lineWidth = 1;

                ctx.stroke();
            }
        }
    }
}

function animate() {

    if (animationActive) {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        particles.forEach((particle) => {

            particle.update();

            particle.draw();

        });

        drawConnections();

    }

    requestAnimationFrame(
        animate
    );
}

animate();