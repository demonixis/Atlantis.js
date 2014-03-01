/**
 * A class that represent a basic object.
 * @author Yannick
 */
var Atlantis = window.Atlantis || {};
Atlantis.Graphics = Atlantis.Graphics || {};

Atlantis.Graphics3D.Vertex = (function () {
    var vertex = function (position, normal, worldPosition, textureCoordinate) {
        if (position instanceof Atlantis.Graphics3D.Vertex) {
            this.position = position.position;
            this.normal = position.normal;
            this.worldCoordinate = position.worldPosition;
            this.textureCoordinate = position.textureCoordinate;
        }
        else {
            this.position = position;
            this.normal = position;
            this.worldCoordinate = worldPosition;
            this.textureCoordinate = textureCoordinate;
        }
    };

    return vertex;
})();