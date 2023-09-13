class Figure {
    constructor({
        color = '#ee8844',
        centre = new Point
    }) {
        this.points = [];
        this.edges = [];
        this.polygons = [];

        this.color = color;
        this.centre = centre;
    }

    generateFigure() {
        this.clearFigure();
        this.generatePoints();
        this.generateEdges();
        this.generatePolygons();
    };

    clearFigure() {
        this.points = [];
        this.edges = [];
        this.polygons = [];
    };

    generatePoints() { };
    generateEdges() { };
    generatePolygons() { };
}