class UI2DComponent extends Component {
    constructor(props) {
        super(props);
        this.num = 0;
        this.menuOpen = false;
    }

    addEventListeners() {
        document.querySelector('.addFunction').addEventListener('click', () => this.addFunctionHandler());

        document.querySelector('.menuGraphButton').addEventListener('click', () => {
            document.querySelector('.container').classList.toggle('containerActive');
            if (this.menuOpen) {
                setTimeout(() => document.querySelector('.block').classList.toggle('hide'), 100);
            } else {
                setTimeout(() => document.querySelector('.block').classList.toggle('hide'), 150);
            }
            this.menuOpen = !this.menuOpen;
        });
    }

    addFunctionHandler() {
        const inputFunc = this.createInput(this.keyUpFunctionHandler, 'f(x)', 'inputFunc');

        const inputWidth = this.createInput(this.keyUpWidthHandler, 'Толщина', 'inputWidth', 'number');

        const inputColor = this.createInput(this.keyUpColorHandler, 'Цвет', 'inputColor', 'color');

        const inputA = this.createInput(this.keyUpAHandler, 'a', 'inputA', 'number');

        const inputB = this.createInput(this.keyUpBHandler, 'b', 'inputB', 'number');

        const button = document.createElement('div');
        button.innerHTML = '&#10006';
        button.dataset.num = this.num;
        button.addEventListener('click', () => {
            div.removeChild(funcBlock);
            this.callbacks.delFunction(button.dataset.num);
        })
        button.className = 'deleteFunc';

        const chekIntegral = document.createElement('div');
        chekIntegral.dataset.num = this.num;
        chekIntegral.className = 'switch-btn';
        chekIntegral.addEventListener('click', (event) =>
            this.switchIntegralHandler(event));

        const funcBlock = document.createElement('div');
        funcBlock.className = 'funcBlock';
        funcBlock.appendChild(inputFunc);
        funcBlock.appendChild(inputWidth);
        funcBlock.appendChild(inputColor);
        funcBlock.appendChild(chekIntegral);
        funcBlock.appendChild(inputA);
        funcBlock.appendChild(inputB);
        funcBlock.appendChild(button);

        const div = document.querySelector('.funcs-сontainer');

        div.appendChild(funcBlock);

        this.callbacks.createObjectFunc(this.num);

        this.num++;
    }

    createInput(handler, placeholder, className, type = 'text') {
        const input = document.createElement('input');
        input.dataset.num = this.num;
        input.addEventListener('input', (event) => handler(event));
        input.setAttribute('placeholder', placeholder);
        input.setAttribute('type', type);
        input.className = className;
        return input;
    }

    keyUpFunctionHandler = (event) => {
        try {
            let f;
            eval(`f = function(x) {return ${event.target.value};}`);
            this.callbacks.addFunction(event.target.dataset.num, f);
        } catch (e) { }
    }

    keyUpWidthHandler = (event) => {
        this.callbacks.changeWidth(event.target.dataset.num, event.target.value);
    }

    keyUpColorHandler = (event) => {
        this.callbacks.changeColor(event.target.dataset.num, event.target.value);
    }

    keyUpAHandler = (event) => {
        this.callbacks.changeA(event.target.dataset.num, event.target.value);
    }

    keyUpBHandler = (event) => {
        this.callbacks.changeB(event.target.dataset.num, event.target.value);
    }

    switchIntegralHandler(event) {
        event.target.classList.toggle('switch-on');
        this.callbacks.switchIntegralCheckBox(event.target.dataset.num);
    }
}
