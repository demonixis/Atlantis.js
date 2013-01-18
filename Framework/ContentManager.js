var Atlantis = window.Atlantis || {};

(function () {
    var assets = [];

    Atlantis = function (rootDirectory) {
        this.rootDirectory = rootDirectory || "";
    }

    Atlantis.prototype.load = function (assetName) {
        if (typeof(this.assets[assetName]) != "undefined") {
            return this.assets[assetName];
        } 
        else {
            var temp = assetName.split(".");
            var ext = temp[(temp.length - 1)];
            
            switch (ext) {
                case "png":
                case "jpg":
                case "bmp":
                    break;
                case "mp3":
                case "ogg":
                case "wave":
                    break;
                case "xml": 
                    break;
                case "json":
                case "js":
                    break;
            } 
        }
    };

    Atlantis.prototype.dispose = function () {
        
    };
})();