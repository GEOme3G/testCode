class Math2D {
    getIntegral(f, a, b, d = 100) {
        const dx = (b - a) / d;
        let x = a;
        let S = 0;
        while (x <= b) {
            S += (f(x) + f(x + dx)) / 2 * dx;
            x += dx;
        }
        return S;
    }

    getZero(f, a, b, eps = 0.0001) {
        if (f(a) * f(b) > 0) return null;
        if (f(a) === 0) return a;
        if (f(b) === 0) return b;
        if (Math.abs(f(b) - f(a)) <= eps) return (a + b) / 2;
        const half = (a + b) / 2;
        if (f(a) * f(half) <= 0) return this.getZero(f, a, half, eps)
        if (f(b) * f(half) <= 0) return this.getZero(f, half, b, eps)
        else return null;
    }
}