class Cube extends Figure {
    constructor({
        color = '#ee8844',
        centre }) {
        super({ color, centre });

        this.generateFigure();
    }

    generatePoints() {
        this.points = [
            new Point(5, 5, 5),
            new Point(-5, 5, 5),
            new Point(5, -5, 5),
            new Point(-5, -5, 5),
            new Point(5, 5, -5),
            new Point(5, -5, -5),
            new Point(-5, 5, -5),
            new Point(-5, -5, -5),
        ];
    }

    generateEdges() {
        this.edges = [
            new Edge(0, 4),
            new Edge(0, 1),
            new Edge(0, 2),
            new Edge(6, 1),
            new Edge(6, 4),
            new Edge(6, 7),
            new Edge(5, 7),
            new Edge(5, 4),
            new Edge(5, 2),
            new Edge(3, 7),
            new Edge(3, 2),
            new Edge(3, 1),
        ];
    }

    generatePolygons() {
        this.polygons = [
            new Polygon([0, 1, 3, 2], '#aaa33a'),
            new Polygon([0, 1, 6, 4], this.color),
            new Polygon([0, 2, 5, 4], this.color),
            new Polygon([2, 3, 7, 5], this.color),
            new Polygon([3, 1, 6, 7], this.color),
            new Polygon([4, 5, 7, 6], this.color),
        ]
    }
}