class Ellipsoid extends Figure {
    constructor({
        focusOx = 10,
        focusOy = 15,
        focusOz = 20,
        count = 20,
        color = '#225533',
        centre }) {
        super({ color, centre });

        this.focusOx = focusOx;
        this.focusOy = focusOy;
        this.focusOz = focusOz;
        this.count = count;

        this.generateFigure();
    }

    generatePoints() {
        const prop = 2 * Math.PI / this.count;
        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.centre.x + this.focusOx * Math.sin(i * prop) * Math.cos(j * prop),
                    this.centre.y + this.focusOy * Math.cos(i * prop),
                    this.centre.z + this.focusOz * Math.sin(i * prop) * Math.sin(j * prop),
                ));
            }
        }
        // const propI = 2 * Math.PI / this.count;
        // const propJ = Math.PI / this.count
        // for (let i = 0; i < this.count; i++) {
        //     for (let j = 0; j < this.count; j++) {
        //         this.points.push(new Point(
        //             this.centre.x + this.focusOx * Math.sin(i * propI) * Math.cos(j * propJ),
        //             this.centre.y + this.focusOy * Math.cos(i * propI),
        //             this.centre.z + this.focusOz * Math.sin(i * propI) * Math.sin(j * propJ),
        //         ));
        //     }
        // }
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
        let k = 0;
        for (let i = 0; i < this.count/2; i++) {
            let rgb = 2 * i*255/this.count;
            for (let j = 0; j < this.count - 1; j++) {
                // this.color = '#'
                // for (let r=0;r<6;r++) {
                //     this.color += Math.floor(Math.random() * 16).toString(16)
                // }
                if (j === this.count - 2) {
                    this.polygons[k] = (new Polygon([
                        j + i * this.count + 1,
                        0 + i * this.count,
                        0 + (i + 1) * this.count,
                        j + (i + 1) * this.count + 1,
                    ], '#ff00ff', i, j));
    
                    this.polygons[k].color = {r: 255, b: Math.trunc(rgb), g: Math.trunc(rgb)};
                    k++;
                }
                this.polygons[k] = (new Polygon([
                    j + i * this.count,
                    j + 1 + i * this.count,
                    j + 1 + (i + 1) * this.count,
                    j + (i + 1) * this.count,
                ], this.color));

                this.polygons[k].color = {r: 255, b: Math.trunc(rgb), g: Math.trunc(rgb)};

                k++;
            }
        }

        
    }
}