class EllipticalParaboloid extends Figure {
    constructor({
        color = '#fef941',
        centre,
        count = 20,
        height = 15,
        focusOx = 4,
        focusOy = 3,
        focusOz = 5,
    }) {
        super({ color, centre });
        this.height = height;
        this.focusOx = focusOx;
        this.focusOy = focusOy;
        this.focusOz = focusOz;
        this.count = count;

        this.generateFigure();
    }

    generatePoints() {
        const propJ = 2 * Math.PI / this.count;
        const propI = this.height / this.count * 0.1;
        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.centre.x + this.focusOx * i * propI * Math.cos(j * propJ),
                    this.centre.y + this.focusOy * Math.pow(i * propI, 2),
                    this.centre.z + this.focusOz * i * propI * Math.sin(j * propJ),
                ))
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
        let k = 0;
        for (let i = 0; i < this.count - 1; i++) {
            for (let j = 0; j < this.count - 1; j++) {
                if ((i+j)%2 == 0) {
                    this.polygons[k] = (new Polygon([
                        i * this.count + j,
                        (i + 1) * this.count + j,
                        (i + 1) * this.count + j + 1,
                        i * this.count + j + 1,
                    ], this.color));
                } else {
                    this.polygons[k] = (new Polygon([
                        i * this.count + j,
                        (i + 1) * this.count + j,
                        (i + 1) * this.count + j + 1,
                        i * this.count + j + 1,
                    ], '9009b0'));
                }

                k++;
            }
            if (i%2 == 1) {
                this.polygons[k] = (new Polygon([
                    i * this.count,
                    (i + 1) * this.count - 1,
                    (i + 2) * this.count - 1,
                    (i + 1) * this.count,
                ], this.color));
            } else {
                this.polygons[k] = (new Polygon([
                    i * this.count,
                    (i + 1) * this.count - 1,
                    (i + 2) * this.count - 1,
                    (i + 1) * this.count,
                ], '9009b0'));
            }
            k++;
        }
    }
}