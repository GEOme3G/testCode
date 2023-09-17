class DoubleCavityHyperboloid extends Figure {
    constructor({
        color = '#40cac7',
        centre, x, y,
        count = 35,
        focusOx = 10,
        focusOy = 10,
        focusOz = 10,
    }) {
        super({ color, centre, x, y});
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
                    this.centre.x + focusProp * this.focusOx * Math.sinh(k * prop) * Math.cos(j * prop),
                    this.centre.y + focusProp * this.focusOy * Math.cosh(k * prop),
                    this.centre.z + focusProp * this.focusOz * Math.sinh(k * prop) * Math.sin(j * prop),
                ));
            }
        }

        for (let i = 0; i < this.count; i++) {
            const k = i - this.count / 2;
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.centre.x + focusProp * this.focusOx * Math.sinh(k * prop) * Math.cos(j * prop),
                    this.centre.y - focusProp * this.focusOy * Math.cosh(k * prop),
                    this.centre.z + focusProp * this.focusOz * Math.sinh(k * prop) * Math.sin(j * prop),
                ));
            }
        }
    }

    generateEdges() {
        const sqrCount = Math.pow(this.count, 2);
        for (let i = 0; i < this.count; i++) {
            const k = i ? i * this.count - 1 : i;
            for (let j = 0; j < this.count - 1; j++) {
                this.edges.push(new Edge(i * this.count + j, i * this.count + j + 1));
                this.edges.push(new Edge((i ? i - 1 : i) * this.count + j, i * this.count + j));
                this.edges.push(new Edge(i * this.count + sqrCount + j, i * this.count + sqrCount + j + 1));
                this.edges.push(new Edge((i ? i - 1 : i) * this.count + sqrCount + j, i * this.count + sqrCount + j));
            }
            this.edges.push(new Edge(k, k + this.count));
            this.edges.push(new Edge(i * this.count, (i + 1) * this.count - 1));
            this.edges.push(new Edge(k + sqrCount, k + sqrCount + this.count));
            this.edges.push(new Edge(i * this.count + sqrCount, (i + 1) * this.count + sqrCount - 1));
        }
    }

    generatePolygons() {
        let k = 0;
        const sqrCount = Math.pow(this.count, 2);
        for (let i = 0; i < this.count - 1; i++) {
            for (let j = 0; j < this.count - 1; j++) {

                this.polygons[k] = new Polygon([
                    i * this.count + j,
                    (i + 1) * this.count + j,
                    (i + 1) * this.count + j + 1,
                    i * this.count + j + 1,
                ], this.color, i, j);
                
                this.polygons[k+1] = new Polygon([
                    i * this.count + sqrCount + j,
                    (i + 1) * this.count + sqrCount + j,
                    (i + 1) * this.count + sqrCount + j + 1,
                    i * this.count + sqrCount + j + 1,
                ], this.color, i, j);
                k+=2;
            }

            
            this.polygons[k] = new Polygon([
                i * this.count,
                (i + 1) * this.count - 1,
                (i + 2) * this.count - 1,
                (i + 1) * this.count,
            ], this.color, i);

            this.polygons[k+1] = new Polygon([
                i * this.count + sqrCount,
                (i + 1) * this.count + sqrCount - 1,
                (i + 2) * this.count + sqrCount - 1,
                (i + 1) * this.count + sqrCount,
            ], this.color, i);

            k+=2;
        }
    }
}