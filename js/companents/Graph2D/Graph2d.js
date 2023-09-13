class Graph2d {
    constructor(WIN, canvas) {
        this.WIN = WIN;
        this.canvas = canvas;
    }

    printOXY() {
        const { LEFT, WIDTH, HEIGHT, BOTTOM } = this.WIN;
        this.canvas.line(LEFT, 0, WIDTH + LEFT, 0, 3);
        this.canvas.line(0, BOTTOM, 0, BOTTOM + HEIGHT, 3);
    }

    grid(color = '#ccc') {
        const { LEFT, WIDTH, BOTTOM, HEIGHT } = this.WIN;
        for (let i = 0; i <= LEFT + WIDTH; i++) {
            this.canvas.line(i, BOTTOM, i, BOTTOM + HEIGHT, 1, color);
        }
        for (let i = 0; i >= LEFT; i--) {
            this.canvas.line(i, BOTTOM, i, BOTTOM + HEIGHT, 1, color);
        }
        for (let i = 0; i <= BOTTOM + HEIGHT; i++) {
            this.canvas.line(LEFT, i, LEFT + WIDTH, i, 1, color);
        }
        for (let i = 0; i >= BOTTOM; i--) {
            this.canvas.line(LEFT, i, LEFT + WIDTH, i, 1, color);
        }
    }

    printNums() {
        const { LEFT, BOTTOM, WIDTH, HEIGHT } = this.WIN;
        const streakLength = HEIGHT / (WIDTH + 30);
        const len = streakLength / 2;
        const shiftY = -HEIGHT * 0.01 - 0.04;
        const shiftX = WIDTH * 0.001 + 0.04;

        for (let i = Math.round(LEFT); i < LEFT + WIDTH; i++) {
            this.canvas.line(i, len, i, -len, 2.5);
            this.canvas.printText(i, i + shiftX, shiftY);
        }
        for (let i = Math.round(BOTTOM); i < BOTTOM + HEIGHT; i++) {
            this.canvas.line(len, i, -len, i, 2.5);
            this.canvas.printText(i, shiftX, i + shiftY);
        }
    }

    printDerivative(f, x) {
        const dx = Math.pow(10, -9),
            k = (f(x + dx) - f(x)) / dx,
            b = f(x) - k * x,
            x1 = this.WIN.LEFT,
            x2 = this.WIN.LEFT + this.WIN.WIDTH,
            y1 = k * x1 + b,
            y2 = k * x2 + b;
        this.canvas.line(x1, y1, x2, y2, 1, 'red');
    }

    printFunction(f, color = 'black', lineWidth = 2) {
        const { WIDTH, LEFT, HEIGHT } = this.WIN;
        const dx = WIDTH / 1000;
        let x = LEFT;

        while (x < WIDTH + LEFT) {
            const y1 = f(x);
            const y2 = f(x + dx);
            if (Math.abs(y1 - y2) < HEIGHT) {
                this.canvas.line(x, f(x), x + dx, f(x + dx), lineWidth, color);
            }
            else {
                this.canvas.line(x, f(x), x + dx, f(x + dx), lineWidth, color, true);
            }
            x += dx;
        }
    }

    printIntegral(f, a, b, integral, d = 100, color = 'r#dbadec') {
        const dx = (b - a) / d;
        let x = a;
        const points = [];
        points.push({ x: a, y: 0 })
        while (x <= b) {
            points.push({ x, y: f(x) });
            x += dx;
        }
        points.push({ x: b, y: f(b) })
        points.push({ x: b, y: 0 })
        this.canvas.polygon(points, color);
        this.canvas.line(a, 0, b, 0, 2, 'orange');
    }
}