var Atlantis = window.Atlantis || {};
Atlantis.Graphics = Atlantis.Graphics || {};

(function () {
    Atlantis.Graphics.DrawCircle = function (canvasContext, x, y, rayon) {
        canvasContext.beginPath();
        canvasContext.arc(x, y, rayon, 0, Math.PI * 2, true);
        canvasContext.fill();
    };

    Atlantis.Graphics.DrawRectPoint = function (canvasContext, x, y, width, height) {
        canvasContext.beginPath();
        canvasContext.rect(x, y, width, height);
        canvasContext.fill();
    };
})();