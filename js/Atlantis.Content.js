var Atlantis = window.Atlantis || {};
Atlantis.Content = Atlantis.Content || {};

(function () {
    var assets = [];

    Atlantis.Content = function (rootDirectory) {
        this.rootDirectory = rootDirectory || "";
    }

    Atlantis.Content.prototype.load = function (assetName) {
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

    Atlantis.Content.prototype.dispose = function () {
        
    };
})();