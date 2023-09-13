class SingleCavityHyperboloid extends Figure {
    constructor({
        color = '#129e25',
        centre,
        count = 20,
        focusOx = 5,
        focusOy = 10,
        focusOz = 5,
    }) {
        super({ color, centre });
        this.count = count;
        this.focusOx = focusOx;
        this.focusOy = focusOy;
        this.focusOz = focusOz;

        this.generateFigure();
    }

    generatePoints() {
        const focusProp = 0.1;
        const prop = 2 * Math.PI / this.count;
        for (let i = 0; i < this.count; i++) {
            const k = i - this.count / 2;
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.centre.x + focusProp * this.focusOx * Math.cosh(k * prop) * Math.cos(j * prop),
                    this.centre.y + focusProp * this.focusOy * Math.sinh(k * prop),
                    this.centre.z + focusProp * this.focusOz * Math.cosh(k * prop) * Math.sin(j * prop),
                ));
            }
        }
    }

    generateEdges() {
        for (let i = 0; i < this.count; i++) {
            const k = i ? i * this.count - 1 : i;
            for (let j = 0; j < this.count - 1; j++) {
                this.edges.push(new Edge(i * this.count + j, i * this.count + j + 1));
                this.edges.push(new Edge((i ? i - 1 : i) * this.count + j, i * this.count + j));
            }
            this.edges.push(new Edge(k, k + this.count));
            this.edges.push(new Edge(i * this.count, (i + 1) * this.count - 1));
        }
    }

    generatePolygons() {
        for (let i = 0; i < this.count - 1; i++) {
            for (let j = 0; j < this.count - 1; j++) {
                
                this.polygons.push(new Polygon([
                    i * this.count + j,
                    (i + 1) * this.count + j,
                    (i + 1) * this.count + j + 1,
                    i * this.count + j + 1,
                ], this.color));
            }

            this.polygons.push(new Polygon([
                i * this.count,
                (i + 1) * this.count - 1,
                (i + 2) * this.count - 1,
                (i + 1) * this.count,
            ], this.color));
        }
    }
}