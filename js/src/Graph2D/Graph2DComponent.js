class Graph2DComponent extends Component {
    constructor(props) {
        super(props);

        const width = 1200;
        const height = 800;

        this.prop = width / height;
        this.WIN = {
            LEFT: -10 * this.prop,
            BOTTOM: -10,
            WIDTH: 20 * this.prop,
            HEIGHT: 20,
        }

        this.mousePosX = 0;

        this.canMove = false;
        this.zoomStep = 1;
        this.funcs = [];

        this.Math2D = new Math2D;

        this.canvas = new Canvas({
            WIN: this.WIN,
            id: 'canvas2D',
            width,
            height,
            callbacks: {
                wheel: (event) => this.wheel(event),
                mouseUp: () => this.mouseUp(),
                mouseDown: () => this.mouseDown(),
                mouseMove: (event) => this.mouseMove(event),
                mouseLeave: () => this.mouseLeave(),
            },
        });

        this.graph2D = new Graph2d(this.WIN, this.canvas);

        new UI2DComponent({
            id: 'UI2D',
            parent: 'graph2D',
            className: 'container',
            template: template.UI2D,
            callbacks: {
                changeColor: (num, color) => this.changeColor(num, color),
                changeWidth: (num, width) => this.changeWidth(num, width),
                changeA: (num, value) => this.changeA(num, value),
                changeB: (num, value) => this.changeB(num, value),
                switchIntegralCheckBox: (num) => this.switchIntegralCheckBox(num),
                addFunction: (num, f) => this.addFunction(num, f),
                delFunction: (num) => this.delFunction(num),
                createObjectFunc: (num) => this.createObjectFunc(num),
            }
        })

        setInterval(() => {
            this.renderGraph();
        }, 15)
    }

    renderGraph() {
        this.canvas.clear();
        this.graph2D.grid();
        this.graph2D.printNums();
        this.graph2D.printOXY();

        this.funcs.forEach(func => {
            if (func) {
                const { f, color, width, a, b, showDerivative, showIntegral } = func;
                if (f) {
                    this.graph2D.printFunction(f, color, width);
                    if (showDerivative) {
                        this.graph2D.printDerivative(f, this.mousePosX);
                    }
                    if ((a || b) && a !== b) {
                        if (showIntegral) {
                            if (a > b) {
                                this.graph2D.printIntegral(f, b, a, this.Math2D.getIntegral(f, b, a));
                            } else {
                                this.graph2D.printIntegral(f, a, b, this.Math2D.getIntegral(f, a, b))
                            }
                        }
                        if (this.Math2D.getZero(f, a, b) !== null) {
                            this.canvas.point(this.Math2D.getZero(f, a, b), 0);
                        }
                    }
                }
            }
        });

        this.canvas.render();
    }

    wheel(event) {
        const delta = (event.wheelDelta > 0) ? -this.zoomStep : this.zoomStep;

        if (this.WIN.WIDTH + delta * this.prop > 0 && this.WIN.HEIGHT + delta > 0) {
            this.WIN.WIDTH += this.prop * delta;
            this.WIN.HEIGHT += delta;
            this.WIN.LEFT -= this.prop * delta / 2;
            this.WIN.BOTTOM -= delta / 2;
        }
    }

    mouseUp() {
        this.canMove = false;
    }

    mouseDown() {
        this.canMove = true;
    }

    mouseMove(event) {
        if (this.canMove) {
            this.WIN.LEFT -= this.canvas.sx(event.movementX);
            this.WIN.BOTTOM -= this.canvas.sy(event.movementY);
        }
        this.mousePosX = this.WIN.LEFT + this.canvas.sx(event.offsetX)
    }

    mouseLeave() {
        this.canMove = false;
    }

    changeWidth(num, width) {
        this.funcs[num].width = width;
    }

    changeColor(num, color) {
        this.funcs[num].color = color;
    }

    addFunction(num, f) {
        this.funcs[num].f = f;
    }

    changeA(num, value) {
        this.funcs[num].a = value - 0;
    }

    changeB(num, value) {
        this.funcs[num].b = value - 0;
    }

    switchIntegralCheckBox(num) {
        this.funcs[num].showIntegral = !this.funcs[num].showIntegral;
    }

    delFunction(num) {
        this.funcs[num] = null;
    }

    createObjectFunc(num) {
        this.funcs[num] = {
            color: 'black',
            width: 2,
        }
    }
}