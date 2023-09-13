class MenuComponent extends Component {
    addEventListeners() {
        const buttons = document.querySelectorAll('.mainMenuButton');
        buttons.forEach(button =>
            button.addEventListener('click', (event) =>
                this.callbacks.showMenuItem(event.target.dataset.item))
        )

        buttons.forEach(button =>
            button.addEventListener('click', (event) =>{
                buttons.forEach((button) =>
                    button.classList.remove('active'));
                event.target.classList.add('active');
            }))
    }
}