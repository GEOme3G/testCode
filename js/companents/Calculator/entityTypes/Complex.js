class Complex {
    constructor(re = 0, im = 0) {
        this.re = re;
        this.im = im;
    }

    toString() {
        if (this.re === 0 && this.im === 0) return '0';
        if (this.im === 0) return `${this.re}`;
        if (this.re === 0) return (this.im > 0) ? `i${this.im}` : `-i${-this.im}`;
        if (Math.abs(this.im) === 1) {
            return (this.im > 0) ? `${this.re}+i` : `${this.re}-i`;
        }
        return (this.im > 0) ? `${this.re}+i${this.im}` : `${this.re}-i${-this.im}`;
    }
}