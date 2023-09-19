class Tor extends Figure {
    constructor({
        radius = 20,
        radius2 = 10,
        count = 20,
        color = '#482153',
        centre }) {
        super({ color, centre });

        this.radius = radius;
        this.radius2 = radius2;
        this.count = count;

        this.generateFigure()
    }

    generatePoints() {
        const sizeProp = 0.5;
        const prop = 2 * Math.PI / this.count;
        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.centre.x + sizeProp * (this.radius + this.radius2 * Math.cos(i * prop)) * Math.cos(j * prop),
                    this.centre.y + sizeProp * this.radius2 * Math.sin(i * prop),
                    this.centre.z + sizeProp * (this.radius + this.radius2 * Math.cos(i * prop)) * Math.sin(j * prop),
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
            this.edges.push(new Edge(i * this.count, (i + 1) * this.count - 1));
            this.edges.push(new Edge(k, k + this.count));
            this.edges.push(new Edge(i, this.points.length - this.count + i));
        }
    }

    generatePolygons() {
        let k = 0
        for (let i = 0; i < this.count - 1; i++) {
            for (let j = 0; j < this.count - 1; j++) {
                this.polygons[k] = (new Polygon([
                    i * this.count + j,
                    (i + 1) * this.count + j,
                    (i + 1) * this.count + j + 1,
                    i * this.count + j + 1,
                ], this.color, i, j));

                k++;
            }

            this.polygons[k] = (new Polygon([
                i * this.count,
                (i + 1) * this.count - 1,
                (i + 2) * this.count - 1,
                (i + 1) * this.count,
            ], this.color, i, this.count - 1));

            this.polygons[k+1] = (new Polygon([
                i,
                this.points.length - this.count + i,
                this.points.length - this.count + i + 1,
                i + 1,
            ], this.color, i, this.count - 1));

            k+= 2;
        }

        this.polygons.push(new Polygon([
            this.points.length - 1,
            this.points.length - this.count,
            0,
            this.count - 1,
        ], this.color, this.count - 1, this.count - 1));
    }
}