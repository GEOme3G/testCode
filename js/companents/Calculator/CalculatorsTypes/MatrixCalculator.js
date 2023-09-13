class MatrixCalculator {
    constructor(calc) {
        this.calc = calc;
    }

    div() {
        return null;
    }

    add(a, b) {
        return new Matrix(a.values.map((arr, i) =>
            arr.map((elem, j) => this.calc.add(elem, b.values[i][j]))));
    }

    sub(a, b) {
        return new Matrix(a.values.map((arr, i) =>
            arr.map((elem, j) => this.calc.sub(elem, b.values[i][j]))))
    }

    mult(a, b) {
        const values = [];
        for (let i = 0; i < a.values.length; i++) {
            values.push([]);
            for (let j = 0; j < b.values[i].length; j++) {
                let s = this.calc.zero();
                for (let k = 0; k < a.values[i].length; k++) {
                    s = this.calc.add(s, this.calc.mult(a.values[i][k], b.values[k][j]));
                }
                values[i][j] = s;
            }
        }
        return new Matrix(values);
    }


    prod(p, a) {
        return new Matrix(a.values.map(arr =>
            arr.map(elem => this.calc.prod(p, elem))))
    }

    pow(a, p) {
        let c = this.one(a.values.length);
        for (let i = 0; i < p; i++) {
            c = this.mult(a, c);
        }
        return c;
    }

    zero(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = this.calc.zero();
            }
        }
        return new Matrix(values);
    }

    one(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = (i === j) ? this.calc.one() : this.calc.zero();
            }
        }
        return new Matrix(values);
    }
}