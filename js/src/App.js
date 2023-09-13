class App extends Component {
    constructor(props) {
        super(props);

        this.menu = new MenuComponent({
            id: 'menu',
            parent: this.id,
            template: template.Menu,
            callbacks: {
                showMenuItem: (name) => this.showMenuItem(name)
            }
        })

        this.calculator = new CalculatorComponent({
            id: 'calculator',
            parent: this.id,
            template: template.Calculator,
        })

        this.polynomialCalculator = new PolynomialCalculatorComponent({
            id: 'polyomialCalculator',
            parent: this.id,
            template: template.PolynomialCalculator,
        })

        this.graph2D = new Graph2DComponent({
            id: "graph2D",
            parent: this.id,
            template: template.Graph2D,
        })

        this.graph3D = new Graph3DComponent({
            id: "graph3D",
            parent: this.id,
            template: template.Graph3D,
        })

        this.showMenuItem('graph3D');

    }

    showMenuItem(name) {
        this.calculator.hide();
        this.polynomialCalculator.hide();
        this.graph2D.hide();
        this.graph3D.hide();
        this[name].show();
    }

}
