class Graph3DComponent extends Component {
    constructor(props) {
        super(props);

        const width = 1200;
        const height = 800;
        this.prop = width / height;

        this.showPoints = false;
        this.showEdges = false;
        this.showPolygons = true;
        this.showAnimation = false;
        this.animate;

        let FPS = 0;
        this.FPS = 0;
        let lastTimestamp = Date.now();

        this.zoomStep = 1.1;
        this.canRotate = false;

        this.LIGHT = new Light(20, 20, -10);

        this.scene = [];

        this.WIN = {
            WIDTH: 20 * this.prop,
            HEIGHT: 20,
            BOTTOM: -10,
            LEFT: -10 * this.prop,
            FOCUS: new Point(0, 0, 20),
            CAMERA: new Point(0, 0, 30),
        };

        this.canvas = new Canvas({
            id: "canvas3D",
            width,
            height,
            WIN: this.WIN,
            callbacks: {
                wheel: (event) => this.wheel(event),
                mouseUp: () => this.mouseUp(),
                mouseDown: () => this.mouseDown(),
                mouseMove: (event) => this.mouseMove(event),
                mouseLeave: () => this.mouseLeave(),
            }
        });

        this.math3D = new Math3D({
            WIN: this.WIN
        });

        new UI3DComponent({
            id: 'UI3D',
            parent: 'graph3D',
            template: template.UI3D,
            className: 'container3D',
            callbacks: {
                keyPress: (event) => this.keyPress(event),
                toggleCheckBox: (name) => this.toggleCheckBox(name),
                addFigure: (figure, num) => this.addFigure(figure, num),
                clearScene: () => this.clearScene(),
                changeFigureSettig: (num, setting, settingValue) =>
                    this.changeFigureSettig(num, setting, settingValue),
                delFigure: (num) => this.delFigure(num),
                changeLightPower: (value) => this.changeLightPower(value),
                
            }
        });

        const animLoop = () => {
            FPS++;
            const timestamp = Date.now();
            if (timestamp - lastTimestamp >= 1000) {
                this.FPS = FPS;
                FPS = 0;
                lastTimestamp = timestamp;
            }
            this.renderScene();
            window.requestAnimFrame(animLoop);
        }

        animLoop();
    }

    renderScene() {
        this.canvas.clear();

        if (this.showPolygons) {
            const polygons = [];
            this.scene.forEach((figure, index) => {
                if (figure) {
                    this.math3D.calcCenters(figure);

                    if (this.showShadows) {
                        this.math3D.calcRadius(figure);
                    }

                    this.math3D.calcDistance(figure, this.WIN.CAMERA, 'distance');
                    this.math3D.calcDistance(figure, this.LIGHT, 'lumen');

                    figure.polygons.forEach((polygon) => {
                        polygon.figureIndex = index;
                        polygons.push(polygon);
                    });
                }
            });
            this.math3D.sortByArtistAlgoritm(polygons, this.scene[0]);
            this.drawPolygons(polygons, this.scene[0]);
        }

        if (this.showEdges) {
            this.drawEdges();
        }

        if (this.showPoints) {
            this.drawPoints();
        }

        this.canvas.render();
    }

    clearScene() {
        this.scene = [];
    }

    drawPoints() {
        this.scene.forEach((figure) => {
            if (figure) {
                figure.points.forEach((point) => {
                    this.canvas.point(this.math3D.xs(point), this.math3D.ys(point), 'black', 2);
                });
            }
        });
    }

    drawEdges() {
        this.scene.forEach((figure) => {
            if (figure) {
                figure.edges.forEach((edge) => {
                    this.canvas.line(
                        this.math3D.xs(figure.points[edge.point1]),
                        this.math3D.ys(figure.points[edge.point1]),
                        this.math3D.xs(figure.points[edge.point2]),
                        this.math3D.ys(figure.points[edge.point2]),
                    )
                });
            }
        });
    }

    drawPolygons(polygons, figure) {
        polygons.forEach((polygon) => {
            const points = [];
            for (let i = 0; i < polygon.points.length; i++) {
                points.push(this.scene[polygon.figureIndex].points[polygon.points[i]]);
            }

            let { r, g, b } = polygon.color;
            const { isShadow, dark } = this.math3D.calcShadow(polygon, this.scene, this.LIGHT);
            
            if (figure.constructor.name === 'ParabolicCylinder') { // ргб
                const lumen = this.math3D.calcIllumination(polygon.distance,
                    this.LIGHT.lumen * (isShadow ? dark : 1));
                r = Math.round(r);
                g = Math.round(g);
                b = Math.round(b);
            } else {
                if (figure.constructor.name == 'SingleCavityHyperboloid') { // область без света
                    if ((polygon.x > figure.count * 0.2) || (polygon.y > figure.count * 0.5)) {
                        const lumen = this.math3D.calcIllumination(polygon.distance,
                            this.LIGHT.lumen * (isShadow ? dark : 1));
                        r = Math.round(r);
                        g = Math.round(g);
                        b = Math.round(b);
                    } else {
                        const lumen = this.math3D.calcIllumination(polygon.distance,
                            this.LIGHT.lumen * (isShadow ? dark : 1));
                        r = Math.round(r * lumen);
                        g = Math.round(g * lumen);
                        b = Math.round(b * lumen);
                    }
                } else {
                    const lumen = this.math3D.calcIllumination(polygon.distance,
                        this.LIGHT.lumen * (isShadow ? dark : 1));
                    r = Math.round(r * lumen);
                    g = Math.round(g * lumen);
                    b = Math.round(b * lumen);
                }
            }

            this.canvas.polygon(
                points.map((point) => {
                    return {
                        x: this.math3D.xs(point),
                        y: this.math3D.ys(point),
                    };
                }),
                polygon.rgbToColor(r, g, b),
            );
        });
    }

    wheel(event) {
        const delta = (event.wheelDelta > 0) ? this.zoomStep : 1 / this.zoomStep;
        this.scene.forEach((figure) => {
            if (figure) {
                figure.points.forEach((point) => {
                    this.math3D.transformPoint(this.math3D.zoom(delta), point);
                });
                this.math3D.transformPoint(this.math3D.zoom(delta), figure.centre);
            }
        })
    }

    mouseUp() {
        this.canRotate = false;
    }

    mouseDown() {
        this.canRotate = true;
    }

    mouseMove(event) {
        if (this.canRotate && !this.showAnimation) {
            const prop = 240;
            this.scene.forEach((figure) => {
                if (figure) {
                    figure.points.forEach((point) => {
                        this.math3D.transformPoint(this.math3D.rotateOx(event.movementY / prop), point);
                        this.math3D.transformPoint(this.math3D.rotateOy(-event.movementX / prop), point);
                    })
                    this.math3D.transformPoint(this.math3D.rotateOx(event.movementY / prop), figure.centre);
                    this.math3D.transformPoint(this.math3D.rotateOy(-event.movementX / prop), figure.centre);
                }
            })
        }
    }

    mouseLeave() {
        this.canRotate = false;
    }

    movePoint(dx, dy, dz = 0) {
        this.scene.forEach((figure) => {
            if (figure) {
                figure.points.forEach((point) => {
                    this.math3D.transformPoint(this.math3D.move(dx, dy, dz), point)
                })
            }
        })
    }

    addFigure(figure, num) {

        switch (figure) {
            case "Cube":
                this.scene[num] = new Cube({});
                break;

            case "Cone":
                this.scene[num] = new Cone({});
                break;

            case "Cylinder":
                this.scene[num] = new Cylinder({});
                break;

            case "DoubleCavityHyperboloid":
                this.scene[num] = new DoubleCavityHyperboloid({});
                break;

            case "Ellipsoid":
                this.scene[num] = new Ellipsoid({});
                break;

            case "EllipticalParaboloid":
                this.scene[num] = new EllipticalParaboloid({});
                break;

            case "HyperbolicParaboloid":
                this.scene[num] = new HyperbolicParaboloid({});
                break;

            case "HyperbolicCylinder":
                this.scene[num] = new HyperbolicCylinder({});
                break;

            case "ParabolicCylinder":
                this.scene[num] = new ParabolicCylinder({});
                break;

            case "SingleCavityHyperboloid":
                this.scene[num] = new SingleCavityHyperboloid({});
                break;

            case "Sphere":
                this.scene[num] = new Sphere({});
                break;

            case "Tor":
                this.scene[num] = new Tor({});
                break;
            }

    }

    changeFigureSettig(num, setting, settingValue) {
        if (setting === 'x' || setting === 'y' || setting === 'z') {
            this.scene[num]['centre'][setting] = settingValue;
        } else {
            this.scene[num][setting] = settingValue;
        }
        this.scene[num].generateFigure();
    }

    toggleCheckBox(name) {
        this[name] = !this[name];
    }

    animationHandler() {
        if (this.showAnimation) {
            this.animate = setInterval(() => {
                this.scene.forEach((figure) => {
                    if (figure) {
                        figure.doAnimation(this.math3D);
                    }
                })
            }, 60);
        } else {
            clearInterval(this.animate);
        }
    }

    delFigure(num) {
        this.scene[num] = 0;
    }

    changeLightPower(value) {
        this.LIGHT.lumen = value;
    }
}