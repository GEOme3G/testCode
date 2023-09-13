class UI3DComponent extends Component {
    constructor(props) {
        super(props);
        this.num = 0;
        this.menuOpen = false;
    }

    addEventListeners() {
        document.querySelector('.lightPower').addEventListener('change', () => this.lightHandler())
        document.querySelector('.menuGraph3DButton').addEventListener('click', this.menuHandler)
        document.querySelector('.addFigure').addEventListener('click', () => this.openFiguresListHandler());
        document.addEventListener('keypress', (event) => this.callbacks.keyPress(event));
        document.querySelectorAll('.figuresCheckBoxes > input').forEach((checkBox) => {
            checkBox.addEventListener('change', (event) => this.changeCheckBoxHandler(event));
        });
        document.getElementById('figuresList').addEventListener('click', (event) => this.addFigureHandler(event));
        
    }

    changeCheckBoxHandler(event) {
        this.callbacks.toggleCheckBox(event.target.dataset.setting);
    }

    lightHandler() {
        this.callbacks.changeLightPower(document.querySelector('.lightPower').value - 0);
    }

    menuHandler() {
        document.querySelector('.container3D').classList.toggle('containerActive');
        if (this.menuOpen) {
            setTimeout(() => document.querySelector('.block3D').classList.toggle('hide'), 100);
            document.getElementById('figuresList').classList.add('hide');
        } else {
            setTimeout(() => document.querySelector('.block3D').classList.toggle('hide'), 150);
        }
        this.menuOpen = !this.menuOpen;
    }

    openFiguresListHandler() {
        document.getElementById('figuresList').classList.remove('hide');
    }

    addFigureHandler(event) {
        console.log(event.target.dataset.figure)
        const figure = event.target.dataset.figure;
        document.getElementById('figuresList').classList.add('hide');
        this.callbacks.addFigure(figure, this.num);

        document.querySelector('.figuresContainer').appendChild(this.createSettings(figure));

    }

    changeFigureSettigHandler(event) {
        const elem = event.target;
        let value = elem.value;
        switch (elem.dataset.setting) {
            case "color":
                break;

            case "count":
                value -= 0;
                if (value < 3) {
                    elem.value = 3;
                    value = 3;
                }
                break;

            case "radius2":
            case "radius":
            case "size":
            case "height":
            case "width":
                value -= 0;
                if (value < 0) {
                    elem.value = 0;
                    value = 0;
                }
                break;

            default:
                value -= 0;
        }
        this.callbacks.changeFigureSettig(
            elem.dataset.num,
            elem.dataset.setting,
            value,
        )
    }

    createSettings(figure) {
        const inputX = this.createInput('number', 'x', 'x', 'inputCenterPointFigure');
        const inputY = this.createInput('number', 'y', 'y', 'inputCenterPointFigure');
        const inputZ = this.createInput('number', 'z', 'z', 'inputCenterPointFigure');
        const inputColor = this.createInput('color', 'color', 'inputColor');

        const figureCenter = document.createElement('div');
        figureCenter.className = 'figureCenter';
        figureCenter.appendChild(inputX);
        figureCenter.appendChild(inputY);
        figureCenter.appendChild(inputZ);

        const settingsBlock = document.createElement('div');
        settingsBlock.dataset.num = this.num;
        settingsBlock.appendChild(figureCenter);
        settingsBlock.appendChild(inputColor);

        switch (figure) {
            case 'Cube':
                settingsBlock.appendChild(this.createInput('number', 'size', 'Длина'));
                break;

            case 'Sphere':
                settingsBlock.appendChild(this.createInput('number', 'radius', 'Радиус'));
                settingsBlock.appendChild(this.createInput('number', 'count', 'Кольца'));
                break;

            case 'Ellipsoid':
                settingsBlock.appendChild(this.createInput('number', 'focusOx', 'ФокусOx', 'ellipsoidFocus'));
                settingsBlock.appendChild(this.createInput('number', 'focusOy', 'ФокусOy', 'ellipsoidFocus'));
                settingsBlock.appendChild(this.createInput('number', 'focusOz', 'ФокусOz', 'ellipsoidFocus'));
                settingsBlock.appendChild(this.createInput('number', 'count', 'Кольца'));
                break;

            case 'Cone':
            case 'Cylinder':
                settingsBlock.appendChild(this.createInput('number', 'radius', 'Радиус'));
                settingsBlock.appendChild(this.createInput('number', 'count', 'Кольца'));
                settingsBlock.appendChild(this.createInput('number', 'height', 'Высота'));
                break;

            case 'ParabolicCylinder':
                settingsBlock.appendChild(this.createInput('number', 'count', 'Дуги'));
                settingsBlock.appendChild(this.createInput('number', 'width', 'Ширина'));
                settingsBlock.appendChild(this.createInput('number', 'height', 'Высота'));
                break;

            case 'HyperbolicCylinder':
                settingsBlock.appendChild(this.createInput('number', 'count', 'Дуги'));
                settingsBlock.appendChild(this.createInput('number', 'width', 'Ширина'));
                settingsBlock.appendChild(this.createInput('number', 'height', 'Высота'));
                settingsBlock.appendChild(this.createInput('number', 'focusOx', 'ФокусOx'));
                break;

            case 'SingleCavityHyperboloid':
            case 'DoubleCavityHyperboloid':
                settingsBlock.appendChild(this.createInput('number', 'count', 'Кольца'));
                settingsBlock.appendChild(this.createInput('number', 'focusOx', 'ФокусOx'));
                settingsBlock.appendChild(this.createInput('number', 'focusOy', 'ФокусOy'));
                settingsBlock.appendChild(this.createInput('number', 'focusOz', 'ФокусOz'));
                break;

            case 'EllipticalParaboloid':
                settingsBlock.appendChild(this.createInput('number', 'count', 'Кольца'));
                settingsBlock.appendChild(this.createInput('number', 'height', 'Высота'));
                settingsBlock.appendChild(this.createInput('number', 'focusOx', 'ФокусOx'));
                settingsBlock.appendChild(this.createInput('number', 'focusOy', 'ФокусOy'));
                settingsBlock.appendChild(this.createInput('number', 'focusOz', 'ФокусOz'));
                break;

            case 'HyperbolicParaboloid':
                settingsBlock.appendChild(this.createInput('number', 'count', 'Кольца'));
                settingsBlock.appendChild(this.createInput('number', 'focusOx', 'ФокусOx'));
                settingsBlock.appendChild(this.createInput('number', 'focusOz', 'ФокусOz'));
                break;

            case 'Tor':
                settingsBlock.appendChild(this.createInput('number', 'radius', 'Внутренний радиус'));
                settingsBlock.appendChild(this.createInput('number', 'radius2', 'Радиус'));
                settingsBlock.appendChild(this.createInput('number', 'count', 'Кольца'));
                break;
        }

        const button = document.createElement('div');
        button.innerHTML = '&#10006';
        button.dataset.num = this.num;
        button.addEventListener('click', () => {
            document.querySelector('.figuresContainer').removeChild(settingsBlock);
            this.callbacks.delFigure(button.dataset.num);
        });
        button.className = 'deleteFunc';

        settingsBlock.appendChild(button);
        this.num++;

        return settingsBlock;
    }

    createInput(type, dataset, placeholder, className) {
        const input = document.createElement('input');
        input.setAttribute('type', type);
        input.setAttribute('placeholder', placeholder);
        input.dataset.setting = dataset;
        input.dataset.num = this.num;

        if (className) {
            input.className = className;
        }

        input.addEventListener('change', (event) =>
            this.changeFigureSettigHandler(event));

        return input;
    }

}