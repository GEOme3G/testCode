Template.prototype.PolynomialCalculator = () =>
`<div class="calcInput">
    <textarea class="polyInputA" placeholder="Полином"></textarea>
    <textarea class="polyInputB" placeholder="Полином"></textarea>
    <textarea class="polyInputX" placeholder="x"></textarea>
</div>
<div class="resultContainer">
    <textarea class="newPoly" placeholder= "Полином" ></textarea>
</div>
<div class="calcButtons">
    <div>
        <div class="polyOperand" data-operand="add">+</div>
        <div class="polyOperand" data-operand="sub">-</div>
        <div class="polyOperand" data-operand="mult">*</div>
        <div class="resultButton">=</div>
    </div>
</div>
<div class="resultContainer">
    <textarea class="polyResult" disabled></textarea>
</div>`