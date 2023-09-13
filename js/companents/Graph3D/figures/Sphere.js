class Sphere extends Figure {
    constructor({
        radius = 10,
        count = 20,
        color = "#532190",
        centre
    }) {
        super({ color, centre });

        this.radius = radius;
        this.count = count;

        this.generateFigure();
    }

    generatePoints() {
        const propI = 2 * Math.PI / this.count;
        const propJ = Math.PI / this.count
        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.centre.x + this.radius * Math.sin(i * propI) * Math.cos(j * propJ),
                    this.centre.y + this.radius * Math.cos(i * propI),
                    this.centre.z + this.radius * Math.sin(i * propI) * Math.sin(j * propJ),
                ));
            }
        }
    }

    generateEdges() {
        for (let i = 0; i < this.count; i++) {
            const k = i ? i - 1 : i;
            for (let j = 0; j < this.count - 1; j++) {
                this.edges.push(new Edge(j + i * this.count, j + i * this.count + 1));
                this.edges.push(new Edge(j + i * this.count, j + k * this.count));
            }
            this.edges.push(new Edge(i * this.count, this.points.length - this.count * k - 1));
            this.edges.push(new Edge(this.points.length - i * this.count - 1, this.points.length - k * this.count - 1));
            this.edges.push(new Edge(0, this.points.length - i - 1));
        }

    }

    generatePolygons() {
        for (let i = 0; i < this.count - 1; i++) {
            for (let j = 0; j < this.count - 1; j++) {
                this.polygons.push(new Polygon([
                    j + i * this.count,
                    j + 1 + i * this.count,
                    j + 1 + (i + 1) * this.count,
                    j + (i + 1) * this.count,
                ], this.color));
            }

            this.polygons.push(new Polygon([
                this.points.length - i * this.count - 1,
                this.points.length - (i ? i - 1 : i) * this.count - 1,
                i * this.count,
                (i + 1) * this.count,
            ], this.color));

            this.polygons.push(new Polygon([
                0,
                this.points.length - i - 1,
                this.points.length - i - 2,
                0,
            ], this.color))
        }

        this.polygons.push(new Polygon([
            0,
            this.points.length - this.count,
            this.count * 2 - 1,
            0,
        ], this.color))
    }
}