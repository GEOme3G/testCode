class HyperbolicParaboloid extends Figure {
    constructor({
        color = '#adaaea',
        centre,
        count = 20,
        focusOx = 4,
        focusOz = 3,
    }) {
        super({ color, centre });
        this.focusOx = focusOx;
        this.focusOz = focusOz;
        this.count = count;

        this.generateFigure();
    }
    generatePoints() {
        const prop = 2 * Math.PI / this.count;
        const a = Math.sqrt(2 * this.focusOx);
        const b = Math.sqrt(2 * this.focusOz);
        const count = this.count / 2;
        for (let i = -count; i < count; i++) {
            for (let j = -count; j < count; j++) {
                this.points.push(new Point(
                    this.centre.x + i * prop * a,
                    this.centre.y + Math.pow(i * prop, 2) - Math.pow(j * prop, 2),
                    this.centre.z + j * prop * b,
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
        }
    }

    generatePolygons() {
        let k = 0;
        for (let i = 0; i < this.count - 1; i++) {
            for (let j = 0; j < this.count - 1; j++) {
                this.polygons[k] = (new Polygon([
                    i * this.count + j,
                    (i + 1) * this.count + j,
                    (i + 1) * this.count + j + 1,
                    i * this.count + j + 1,
                ], this.color));
                
                k++;
            }
        }
    }
}