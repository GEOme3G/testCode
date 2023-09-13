class Polynomial {
    constructor(poly = []) {
        this.poly = poly.filter(elem => elem.value);
        this.poly.sort((a, b) => b.power - a.power);
    }

    getValue(x) {
        const calc = new Calculator;
        return this.poly.reduce((s, elem) => 
            s = calc.add(s, calc.prod(elem.value, calc.pow(x, elem.power))), calc.zero(null, x)
        );
    }

    toString() {
        if (this.poly.length) {
            return this.poly.map(
                (el, index) => `${el.value > 0 && index ? '+' : ''}${el.toString()}`).join('');
        }
        return 0;
    }
}