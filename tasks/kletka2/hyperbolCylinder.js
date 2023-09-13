class HyperbolicCylinder extends Figure {
    constructor({
        color = '#41a7b4',
        centre,
        k,
        l,
        count = 15,
        focusOx = 5,
        width = 5,
        height = 80,
    }) {
        super({ color, centre });

        this.count = count;
        this.focusOx = focusOx;
        this.width = width;
        this.height = height;
        this.k = k;
        this.l = l;

        this.generateFigure();
    }

    generatePoints() {
        const propI = 2 * Math.PI / this.count;
        const propJ = this.height / this.count;
        const halfCount = this.count / 2;
        const sizeProp = 0.3;

        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.centre.x + sizeProp * this.focusOx * Math.cosh((i - halfCount) * propI),
                    this.centre.y + sizeProp * (j - halfCount) * propJ,
                    this.centre.z + sizeProp * this.width * Math.sinh((i - halfCount) * propI),
                ));
            }
        }

        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.centre.x - sizeProp * this.focusOx * Math.cosh((i - halfCount) * propI),
                    this.centre.y + sizeProp * (j - halfCount) * propJ,
                    this.centre.z + sizeProp * this.width * Math.sinh((i - halfCount) * propI),
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
            this.edges.push(new Edge(k + sqrCount, k + sqrCount + this.count));
        }
    }

    generatePolygons() {

        const sqrCount = Math.pow(this.count, 2);

        for (let i = 0; i < this.count - 1; i++) {
            for (let j = 0; j < this.count - 1; j++) {
                if( (i%4 == 1 || i%4 == 0) && (j%4 == 1 || j%4 == 0)) {
                    this.polygons.push(new Polygon([
                        i * this.count + j,
                        (i + 1) * this.count + j,
                        (i + 1) * this.count + j + 1,
                        i * this.count + j + 1,
                    ], this.color));
                    }
                else {if ((i%4 == 2 || i%4 == 3) && (j%4 == 2 || j%4 == 3)){
                    this.polygons.push(new Polygon([
                        i * this.count + j,
                        (i + 1) * this.count + j,
                        (i + 1) * this.count + j + 1,
                        i * this.count + j + 1,
                    ], this.color));
                    }
                    else {
                        this.polygons.push(new Polygon([
                            i * this.count + j,
                            (i + 1) * this.count + j,
                            (i + 1) * this.count + j + 1,
                            i * this.count + j + 1,
                        ], '3564b0'));
                        }}
                
                if( (i%4 == 1 || i%4 == 0) && (j%4 == 1 || j%4 == 0)) {
                    this.polygons.push(new Polygon([
                        i * this.count + sqrCount + j,
                        (i + 1) * this.count + sqrCount + j,
                        (i + 1) * this.count + sqrCount + j + 1,
                        i * this.count + sqrCount + j + 1,
                    ], this.color));
                    }
                else {if ((i%4 == 2 || i%4 == 3) && (j%4 == 2 || j%4 == 3)){
                    this.polygons.push(new Polygon([
                        i * this.count + sqrCount + j,
                        (i + 1) * this.count + sqrCount + j,
                        (i + 1) * this.count + sqrCount + j + 1,
                        i * this.count + sqrCount + j + 1,
                    ], this.color));
                    }
                    else {
                        this.polygons.push(new Polygon([
                            i * this.count + sqrCount + j,
                            (i + 1) * this.count + sqrCount + j,
                            (i + 1) * this.count + sqrCount + j + 1,
                            i * this.count + sqrCount + j + 1,
                        ], '3564b0'));
                        }}
                
                // this.polygons.push(new Polygon([
                //     i * this.count + sqrCount + j,
                //     (i + 1) * this.count + sqrCount + j,
                //     (i + 1) * this.count + sqrCount + j + 1,
                //     i * this.count + sqrCount + j + 1,
                // ], '3564b0'));
                
            }
        }
    }
}