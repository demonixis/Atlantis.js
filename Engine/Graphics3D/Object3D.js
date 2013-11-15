/**
 * A class that represent a basic object.
 * @author Yannick
 */
var Atlantis = window.Atlantis || {};
Atlantis.Graphics = Atlantis.Graphics || {};

Atlantis.Graphics3D.Object3D = (function () {
    var object3D = function (x, y, z) {
        this.name = "";
        this.position = new Atlantis.Vector3();
        this.rotation = new Atlantis.Vector3();
        this.scale = new Atlantis.Vector3();
    };

    object3D.prototype.move = function (move) {
        this.position.x = move.x;
        this.position.y = move.y;
        this.position.z = move.z;
    };

    object3D.prototype.translate = function (x, y, z) {
        var translation = (x instanceof Atlantis.Vector3) ? x : new Atlantis.Vector3(x, y, z); 
        var transform = Atlantis.Vector3.transformCoordinate(translation, Matrix.createRotationY(this.rotation.y));
        this.position.x += transform.x;
        this.position.y += transform.y;
        this.position.z += transform.z;
    };

    object3D.prototype.rotate = function (rx, ry, rz) {
        if (rx instanceof Atlantis.Vector3) {
            this.rotation.add(rx);   
        }
        else {
            this.rotation.x += rx;
            this.rotation.y += ry;
            this.rotation.z += rz;
        }
    };
    
    object3D.prototype.scaling = function (sx, sy, sz) {
        if (sx instanceof Atlantis.Vector3) {
            this.scale.x += sx;
            this.scale.y += sy;
            this.scale.z += sz;
        }
    };
    
    return object3D;
})();