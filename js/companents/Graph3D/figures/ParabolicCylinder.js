class ParabolicCylinder extends Figure {
    constructor({
        color = '#e3b6d4',
        centre,
        count = 20,
        height = 10,
        width = 5,
    }) {
        super({ color, centre });
        this.count = count;
        this.height = height;
        this.width = width;

        this.generateFigure();
    }

    generatePoints() {
        const propI = this.height / this.count;
        const propJ = 2 * Math.PI / this.count;
        const sizeProp = 2;

        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.centre.x + sizeProp * Math.sqrt(this.width * j * propJ),
                    this.centre.y + sizeProp * (i * propI - this.height / 2),
                    this.centre.z + sizeProp * j * propJ,
                ));
            }
        }

        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.centre.x - sizeProp * Math.sqrt(this.width * j * propJ),
                    this.centre.y + sizeProp * (i * propI - this.height / 2),
                    this.centre.z + sizeProp * j * propJ,
                ));
            }
        }
    }



    generateEdges() {
        const stepIndex = Math.pow(this.count, 2);
        for (let i = 0; i < this.count; i++) {
            const k = i ? i * this.count - 1 : i;
            for (let j = 0; j < this.count - 1; j++) {
                this.edges.push(new Edge(i * this.count + j, i * this.count + j + 1));
                this.edges.push(new Edge(i * this.count + j + stepIndex, i * this.count + j + stepIndex + 1));
                this.edges.push(new Edge((i ? i - 1 : i) * this.count + j, i * this.count + j));
                this.edges.push(new Edge((i ? i - 1 : i) * this.count + stepIndex + j, i * this.count + stepIndex + j));
            }
        }
        for (let i = 1; i < this.count; i++) {
            this.edges.push(new Edge(i * this.count - 1, (i + 1) * this.count - 1));
            this.edges.push(new Edge(i * this.count + stepIndex - 1, (i + 1) * this.count + stepIndex - 1));
        }
    }

    generatePolygons() {
        let k = 0;
        const stepIndex = Math.pow(this.count, 2);
        for (let i = 0; i < this.count - 1; i++) {
            for (let j = 0; j < this.count - 1; j++) {
                let rgb = i*255/this.count; // ргб
                this.polygons[k] = (new Polygon([
                    i * this.count + j,
                    (i + 1) * this.count + j,
                    (i + 1) * this.count + j + 1,
                    i * this.count + j + 1,
                ], this.color));

                this.polygons[k].color = {r: Math.trunc(rgb), b: Math.trunc(rgb), g: 205};

                this.polygons[k+1] = (new Polygon([
                    i * this.count + stepIndex + j,
                    (i + 1) * this.count + stepIndex + j,
                    (i + 1) * this.count + stepIndex + j + 1,
                    i * this.count + stepIndex + j + 1,
                ], this.color));

                this.polygons[k+1].color = {r: Math.trunc(rgb), b: Math.trunc(rgb), g: 205};
                k+=2;
            }
        }
    }
}