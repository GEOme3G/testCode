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
        const propI = 2 * Math.PI / this.count;
        const propJ = Math.PI / this.count
        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.centre.x + this.focusOx * Math.sin(i * propI) * Math.cos(j * propJ),
                    this.centre.y + this.focusOy * Math.cos(i * propI),
                    this.centre.z + this.focusOz * Math.sin(i * propI) * Math.sin(j * propJ),
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
        let k = 0;
        for (let i = 0; i < this.count - 1; i++) {
            for (let j = 0; j < this.count - 1; j++) {
                // this.color = '#'
                // for (let r=0;r<6;r++) {
                //     this.color += Math.floor(Math.random() * 16).toString(16)
                // }
                if ((i < 7 && i >= 2 && j <= 1)) {
                    
                }
                else if ((i <= this.count - 3 && i > this.count - 8) && (j <= 4)) {
                    
                } 
                else if ((i <= this.count - 3 && i > this.count - 8) && j >= this.count - 3){
                    
                } else {
                this.polygons[k] = (new Polygon([
                    j + i * this.count,
                    j + 1 + i * this.count,
                    j + 1 + (i + 1) * this.count,
                    j + (i + 1) * this.count,
                ], this.color));
                }
                k++;
            }
            if (i > 1 && i <= 6) {
            
            } else {
                this.polygons[k] = (new Polygon([
                    this.points.length - i * this.count - 1,
                    this.points.length - (i ? i - 1 : i) * this.count - 1,
                    i * this.count,
                    (i + 1) * this.count,
                ], '9999b0'));
            }

            this.polygons[k+1] = (new Polygon([
                0,
                this.points.length - i - 1,
                this.points.length - i - 2,
                0,
            ], this.color))

            k+=2;
        }

        this.polygons[k] = (new Polygon([
            0,
            this.points.length - this.count,
            this.count * 2 - 1,
            0,
        ], this.color))
    }
}