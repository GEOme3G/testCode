class UI2D {
    constructor({
        changeColor,
        changeWidth,
        changeA,
        changeB,
        switchIntegralCheckBox,
        addFunction,
        delFunction,
        createObjectFunc
    }) {
        this.addFunction = addFunction;
        this.delFunction = delFunction;
        this.changeWidth = changeWidth;
        this.changeColor = changeColor;
        this.changeA = changeA;
        this.changeB = changeB;
        this.switchIntegralCheckBox = switchIntegralCheckBox;
        this.createObjectFunc = createObjectFunc;

        this.num = 0;
        document.querySelector('.addFunction').addEventListener('click', () => this.addFunctionHandler());
        
        document.querySelector('.menuGraphButton').addEventListener('click', () => {
            document.querySelector('.container').classList.toggle('containerActive');
            if (this.MenuOpen) {
                setTimeout(() => document.querySelector('.block').classList.toggle('hide'), 100);
            } else {
                setTimeout(() => document.querySelector('.block').classList.toggle('hide'), 150);
            }
            this.MenuOpen = !this.MenuOpen;
        });

        this.MenuOpen = false;
    }

    addFunctionHandler() {

        const inputFunc = this.createInput(this.keyUpFunctionHandler, 'f(x)', 'inputFunc');

        const inputWidth = this.createInput(this.keyUpWidthHandler, 'Ширина','inputWidth', 'number');

        const inputColor = this.createInput(this.keyUpColorHandler, 'Цвет', 'inputColor', 'color');

        const inputA = this.createInput(this.keyUpAHandler, 'a', 'inputA', 'number');

        const inputB = this.createInput(this.keyUpBHandler, 'b','inputB', 'number');
        
        const button = document.createElement('div');
        button.innerHTML = '&#10006';
        button.dataset.num = this.num;
        button.addEventListener('click', () => {
            div.removeChild(funcBlock);
            this.delFunction(button.dataset.num);
        })
        button.className = 'deleteFunc';

        const chekIntegral = document.createElement('div');
        chekIntegral.dataset.num = this.num;
        chekIntegral.className = 'switch-btn';
        chekIntegral.addEventListener('click', (event) => this.switchIntegralHandler(event))


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

        this.createObjectFunc(this.num);

        this.num++;
    }

    createInput(handler, placeholder, className, type ='text') {
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
            this.addFunction(event.target.dataset.num, f);
        } catch (e) {
            console.log(e);
        }
    }

    keyUpWidthHandler = (event) => {
        this.changeWidth(event.target.dataset.num, event.target.value);
    }

    keyUpColorHandler = (event) => {
        this.changeColor(event.target.dataset.num, event.target.value);
    }

    keyUpAHandler = (event) => {
        this.changeA(event.target.dataset.num, event.target.value);
    }

    keyUpBHandler = (event) => {
        this.changeB(event.target.dataset.num, event.target.value);
    }

    switchIntegralHandler(event) {
        event.target.classList.toggle('switch-on');
        this.switchIntegralCheckBox(event.target.dataset.num);
    }

}