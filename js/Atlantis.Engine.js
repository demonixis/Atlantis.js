var Atlantis = window.Atlantis || {};

(function() {
    Atlantis.Game = function (width, height, domElement) {
        this.width = width;
        this.height = height;
        this.domElement = domElement || document;
    };
})();