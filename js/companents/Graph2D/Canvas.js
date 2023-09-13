
class Canvas {
    constructor({ id, width = 500, height = 500, WIN, callbacks }) {

        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');

        this.canvasVirtual = document.createElement('canvas');
        this.contextVirtual = this.canvasVirtual.getContext('2d');

        this.canvas.width = width;
        this.canvasVirtual.width = width;
        this.canvas.height = height;
        this.canvasVirtual.height = height;

        this.WIN = WIN;

        const { wheel, mouseUp, mouseDown, mouseMove, mouseLeave } = callbacks;
        this.canvas.addEventListener('wheel', wheel);
        this.canvas.addEventListener('mousedown', mouseDown);
        this.canvas.addEventListener('mouseup', mouseUp);
        this.canvas.addEventListener('mousemove', mouseMove);
        this.canvas.addEventListener('mouseleave', mouseLeave);
    }

    xs(x) {
        return (x - this.WIN.LEFT) / this.WIN.WIDTH * this.canvas.width;
    }

    ys(y) {
        return this.canvas.height - (y - this.WIN.BOTTOM) / this.WIN.HEIGHT * this.canvas.height;
    }

    sx(x) {
        return x * this.WIN.WIDTH / this.canvas.width;
    }

    sy(y) {
        return -y * this.WIN.HEIGHT / this.canvas.height;
    }

    x(xs) {
        return xs * this.WIN.WIDTH / this.canvas.width + this.WIN.LEFT;
    }

    y(ys) {
        return -ys * this.WIN.HEIGHT / this.canvas.height + this.WIN.BOTTOM + this.WIN.HEIGHT;
    }

    clear() {
        this.contextVirtual.fillStyle = 'white';
        this.contextVirtual.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    line(x1, y1, x2, y2, width = 1, color = 'black', isDash = false) {
        this.contextVirtual.beginPath();
        this.contextVirtual.strokeStyle = color;
        this.contextVirtual.moveTo(this.xs(x1), this.ys(y1));
        if (isDash) {
            this.contextVirtual.lineWidth = 1;
            this.contextVirtual.setLineDash([10, 10]);
        } else {
            this.contextVirtual.lineWidth = width;
            this.contextVirtual.setLineDash([]);
        }
        this.contextVirtual.lineTo(this.xs(x2), this.ys(y2));
        this.contextVirtual.stroke();
        this.contextVirtual.closePath();
    }

    printText(text, x, y, color = 'black', size = 12) {
        this.contextVirtual.font = `${size}px serif`;
        this.contextVirtual.fillStyle = color;
        this.contextVirtual.fillText(text, this.xs(x), this.ys(y));
    }

    point(x, y, color = 'red', size = 4) {
        this.contextVirtual.beginPath();
        this.contextVirtual.arc(this.xs(x), this.ys(y), size, 0, 2 * Math.PI);
        this.contextVirtual.fillStyle = color;
        this.contextVirtual.fill();
        this.contextVirtual.closePath();
    }

    polygon(points, color) {
        if (points.length >= 3) {
            this.contextVirtual.fillStyle = color;
            this.contextVirtual.beginPath();
            this.contextVirtual.moveTo(this.xs(points[0].x), this.ys(points[0].y));
            for (let i = 1; i < points.length; i++) {
                this.contextVirtual.lineTo(this.xs(points[i].x), this.ys(points[i].y));
            }
            this.contextVirtual.lineWidth = 4;
            this.contextVirtual.lineTo(this.xs(points[0].x), this.ys(points[0].y));
            this.contextVirtual.closePath();
            this.contextVirtual.fill();
        }
    }

    render() {
        this.context.drawImage(this.canvasVirtual, 0, 0);
    }
}

