class Calculator {
    complex(re, im) {
        return new Complex(re, im)
    }

    vector(values) {
        return new Vector(values);
    }

    matrix(values ) {
        console.log(values)
        return new Matrix(values);
    }

    getEntity(str) {
        str = str.replace(/\s/g, '');
        if (str.includes('[')) return this.getMatrix(str);
        if (str.includes('(')) return this.getVector(str);
        return this.getComplex(str);
    }

    getMatrix(str) {
        const arr = str.slice(1, -1).split('|').map(
            elems => elems.split(';').map(elem =>
                this.getEntity(elem)
            )
        );
        return new Matrix(arr);
    }

    getVector(str) {
        if (str[0] === '(') {
            const arr = str.slice(1, -1).split(',');
            return new Vector(arr.map(elem => this.getEntity(elem)));
        }
    }

    getComplex(str) {
        const arr = str.split('i');
        if (arr.length === 2) {
            const ch = arr[0].substr(arr[0].length - 1)
            arr[0] = arr[0].slice(0, -1);
            arr[1] = arr[1] ? arr[1] : 1;
            if (ch === '-') {
                arr[1] = ch + arr[1];
            }
            if (arr[0]) {
                return new Complex(arr[0] - 0, arr[1] - 0);
            }
            return new Complex(0, arr[1] - 0)
        }
        return new Complex(str - 0);
    }

    get(elem) {
        if (elem instanceof Matrix) {
            return new MatrixCalculator(this.get(elem.values[0][0]));
        }
        if (elem instanceof Vector) {
            return new VectorCalculator(this.get(elem.values[0]));
        }
        if (elem instanceof Complex) {
            return new ComplexCalculator;
        }
        return new RealCalculator;
    }

    add(a, b) {
        return this.get(a).add(a, b);
    }

    sub(a, b) {
        return this.get(a).sub(a, b);
    }

    mult(a, b) {
        return this.get(a).mult(a, b);
    }

    div(a, b) {
        return this.get(a).div(a, b);
    }

    prod(p, a) {
        return this.get(a).prod(p, a);
    }

    pow(a, p) {
        return this.get(a).pow(a, p);
    }

    zero(type, elem) {
        type = type ? type : elem ? elem.constructor.name : null;

        switch (type) {
            case 'Complex':
                return this.get(this.complex()).zero();
            case 'Vector':
                return this.get(this.vector()).zero();
            case 'Matrix':
                return this.get(this.matrix()).zero();
            default:
                this.get().zero(this.complex());
        }
    }

    one(type, elem) {
        type = type ? type : elem ? elem.constructor.name : null;

        switch (type) {
            case 'Complex':
                return this.get(this.complex()).one();
            case 'Vector':
                return this.get(this.vector()).one();
            case 'Matrix':
                return this.get(this.matrix()).one();
            default:
                this.get().one(this.complex());
        }
    }
}