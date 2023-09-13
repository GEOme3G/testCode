const template = new Template;

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 15);
        }
})();

window.onload = () => {
    new App({
        id: 'app',
        template: template.AppTemplate,
    });
}