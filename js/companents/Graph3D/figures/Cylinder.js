class Cylinder extends Figure {
    constructor({
        color = '#9278b0',
        centre,
        height = 20,
        count = 35,
        radius = 10,
    }) {
        super({color, centre});
        this.count = count;
        this.radius = radius;
        this.height = height;

        this.generateFigure();
    }

    generatePoints() {
        const propI = this.height / this.count;
        const propJ = 2 * Math.PI / this.count;

        for (let i = -this.count / 2; i < this.count / 2; i++) {
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.centre.x + this.radius * Math.cos(j * propJ),
                    this.centre.y + i * propI,
                    this.centre.z + this.radius * Math.sin(j * propJ),
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
        let k = 0;
        for (let i = 0; i < this.count - 1; i++) {
            for (let j = 0; j < this.count - 1; j++) {
                if( (i%4 == 1 || i%4 == 0) && (j%4 == 1 || j%4 == 0)) {
                    this.polygons[k] = (new Polygon([
                        i * this.count + j,
                        (i + 1) * this.count + j,
                        (i + 1) * this.count + j + 1,
                        i * this.count + j + 1,
                    ], '7722b0'));
                    }
                else {if ((i%4 == 2 || i%4 == 3) && (j%4 == 2 || j%4 == 3)){
                    this.polygons[k] = (new Polygon([
                        i * this.count + j,
                        (i + 1) * this.count + j,
                        (i + 1) * this.count + j + 1,
                        i * this.count + j + 1,
                    ], '7722b0'));
                    }
                    else {
                        this.polygons[k] = (new Polygon([
                            i * this.count + j,
                            (i + 1) * this.count + j,
                            (i + 1) * this.count + j + 1,
                            i * this.count + j + 1,
                        ], this.color));
                        }}
                k++;
            }
            
            if (i%4 == 2 || i%4 == 3){
            this.polygons[k] = (new Polygon([
                i * this.count,
                (i + 1) * this.count - 1,
                (i + 2) * this.count - 1,
                (i + 1) * this.count,
            ], '7722b0'));
        } else {
            this.polygons[k] = (new Polygon([
                i * this.count,
                (i + 1) * this.count - 1,
                (i + 2) * this.count - 1,
                (i + 1) * this.count,
            ], this.color));
        }
        k++;
        }
    }
}