class Math3D {
    constructor({ WIN }) {
        this.WIN = WIN;
    }

    xs(point) {
        const { CAMERA, FOCUS } = this.WIN;
        return (point.x - CAMERA.x) / (point.z - CAMERA.z) * (FOCUS.z - CAMERA.z) - CAMERA.x;
    }

    ys(point) {
        const { CAMERA, FOCUS } = this.WIN;
        return (point.y - CAMERA.y) / (point.z - CAMERA.z) * (FOCUS.z - CAMERA.z) - CAMERA.y;
    }

    mult(matrix, point) {
        const c = [0, 0, 0, 0];
        for (let i = 0; i < 4; i++) {
            let s = 0;
            for (let j = 0; j < 4; j++) {
                s += matrix[j][i] * point[j];
            }
            c[i] = s;
        }
        return c;
    }

    mutlMatrix(a, b) {
        const result = [];
        for (let i = 0; i < a.length; i++) {
            result.push([]);
            for (let j = 0; j < b[i].length; j++) {
                result[i][j] = 0;
                for (let k = 0; k < a[i].length; k++) {
                    result[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        return result;
    }

    getTranformMatrix() {
        return Array.from(arguments).reduce((result, matrix) =>
            this.mutlMatrix(result, matrix), [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]);
    }

    transformPoint(matrix, point) {
        const array = this.mult(
            matrix,
            [point.x, point.y, point.z, 1]);
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }

    zoom(delta) {
        return [
            [delta, 0, 0, 0],
            [0, delta, 0, 0],
            [0, 0, delta, 0],
            [0, 0, 0, 1]
        ];
    }

    move(dx, dy, dz) {
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [dx, dy, dz, 1]
        ];
    }

    rotateOx(alpha) {
        return [
            [1, 0, 0, 0],
            [0, Math.cos(alpha), Math.sin(alpha), 0],
            [0, -Math.sin(alpha), Math.cos(alpha), 0],
            [0, 0, 0, 1]
        ];
    }

    rotateOy(alpha) {
        return [
            [Math.cos(alpha), 0, Math.sin(alpha), 0],
            [0, 1, 0, 0],
            [-Math.sin(alpha), 0, Math.cos(alpha), 0],
            [0, 0, 0, 1]
        ];
    }

    rotateOz(alpha) {
        return [
            [Math.cos(alpha), -Math.sin(alpha), 0, 0],
            [Math.sin(alpha), Math.cos(alpha), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]
    }

    calcCenters(figure) {
        figure.polygons.forEach((polygon) => {
            const points = polygon.points;
            let x = 0, y = 0, z = 0;
            for (let i = 0; i < points.length; i++) {
                x += figure.points[points[i]].x;
                y += figure.points[points[i]].y;
                z += figure.points[points[i]].z;
            };

            polygon.centre.x = x / points.length;
            polygon.centre.y = y / points.length;
            polygon.centre.z = z / points.length;
        })
    }

    calcDistance(figure, endPoint, name) {
        figure.polygons.forEach((polygon) => {
            polygon[name] = Math.sqrt(
                Math.pow(endPoint.x - polygon.centre.x, 2) +
                Math.pow(endPoint.y - polygon.centre.y, 2) +
                Math.pow(endPoint.z - polygon.centre.z, 2));
        });
    }

    calcVector(a, b) {
        return {
            x: b.x - a.x,
            y: b.y - a.y,
            z: b.z - a.z,
        }
    }

    vectProd(a, b) {
        return {
            x: a.y * b.z - a.z * b.y,
            y: a.x * b.z + a.z * b.x,
            z: a.x * b.y - a.y * b.x,
        }
    }

    calcVectorModule(a) {
        return Math.sqrt(
            Math.pow(a.x, 2) +
            Math.pow(a.y, 2) +
            Math.pow(a.z, 2)
        );
    }

    calcRadius(figure) {
        const points = figure.points;
        figure.polygons.forEach((polygon) => {
            const centre = polygon.centre;
            const p1 = points[polygon.points[0]];
            const p2 = points[polygon.points[1]];
            const p3 = points[polygon.points[2]];
            const p4 = points[polygon.points[3]];

            polygon.radius = (
                this.calcVectorModule(this.calcVector(centre, p1)) +
                this.calcVectorModule(this.calcVector(centre, p2)) +
                this.calcVectorModule(this.calcVector(centre, p3)) +
                this.calcVectorModule(this.calcVector(centre, p4))
            ) / 4;
        });
    }

    calcShadow(polygon, figures, LIGHT) {
        if (polygon.radius) {
            const m1 = polygon.centre;
            const radius = polygon.radius;
            const s = this.calcVector(m1, LIGHT);
            for (let i = 0; i < figures.length; i++) {
                if (polygon.figureIndex === i) {
                    continue;
                }

                if (figures[i]) {
                    for (let j = 0; j < figures[i].polygons.length; j++) {
                        const polygon2 = figures[i].polygons[j];
                        const m0 = polygon2.centre;
                        if (polygon.lumen < polygon2.lumen) {
                            continue;
                        }
                        const dark = this.calcVectorModule(
                            this.vectProd(this.calcVector(m0, m1),
                                s
                            )) / this.calcVectorModule(s);
                        if (dark < radius) {
                            return {
                                isShadow: true,
                                dark: dark / 1.4
                            }
                        }
                    }
                }
            }
        }
        return {
            isShadow: false,
        }
    }

    sortByArtistAlgoritm(polygons) {
        polygons.sort((a, b) => b.distance - a.distance);
    }

    calcIllumination(distance, lumen) {
        const res = distance ? lumen / Math.pow(distance, 3) : 1;
        return res > 1 ? 1 : res;
    }


}