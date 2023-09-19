class Polygon {
    constructor(
        points,
        color = '#ee8448',
        x, y,
        centre = new Point
    ) {
        this.points = points;
        this.distance = 0;
        this.centre = centre;
        this.lumen = 1;
        this.color = this.hexToRGB(color);
        this.figureIndex;
        this.radius = 0;
        this.x = x;
        this.y = y;
    }

    hexToRGB(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        } : { r: 0, g: 0, b: 0 };
    }

    rgbToColor(r, g, b) {
        return `rgb(${r},${g}, ${b})`;
    }
}