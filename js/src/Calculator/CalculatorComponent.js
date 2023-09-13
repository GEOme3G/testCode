class CalculatorComponent extends Component {
    addEventListeners() {
        document.querySelectorAll('.operand')
            .forEach(button => button.addEventListener('click', (event) =>
                this.operandHandler(event)));
    }

    operandHandler(event) {
        const inputA = document.querySelector('.inputA');
        const inputB = document.querySelector('.inputB');
        const calc = new Calculator;
        const a = calc.getEntity(inputA.value);
        const b = calc.getEntity(inputB.value);
        const operand = event.target.dataset.operand;
        const c = calc[operand](a, b);
        document.querySelector('.result').innerHTML = c.toString();
    }

}