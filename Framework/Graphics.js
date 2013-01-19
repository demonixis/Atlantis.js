var Atlantis = window.Atlantis || {};
Atlantis.Graphics = Atlantis.Graphics || {};

(function () {
    Atlantis.Graphics.beginDraw = function (context) {
        context.beginPath();
    };

    Atlantis.Graphics.endDraw = function (context) {
        context.fill();
    };

    Atlantis.Graphics.drawCircle = function (context, x, y, rayon, color) {
        context.arc(x, y, rayon, 0, Math.PI * 2, true);
        context.fillStyle = color || '#ffffff';
    };

    Atlantis.Graphics.drawRectPoint = function (context, x, y, width, height, color) {
        context.rect(x, y, width, height);
        context.fillStyle = color || '#ffffff';
    };

    Atlantis.Graphics.drawText = function (context, text, x, y, params) {
        var params = params || {};
        var style = params.style || "normal";
        var size = params.size || 12;
        var font = params.font || "sans-serif";
        var color = params.color || "#fff";

        context.fillStyle = color || '#ffffff';
        context.font = style + " " + size + "px " + font;
        context.fillText(text, x, y);
    };
})();