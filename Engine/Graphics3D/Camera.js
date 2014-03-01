/**
 * Define a camera for viewing a 3D scene.
 * @author Yannick
 */
var Atlantis = window.Atlantis || {};
Atlantis.Graphics = Atlantis.Graphics || {};

Atlantis.Graphics3D.Camera = (function () {

    /**
	 * Create a camera with a position of (0, 0, 10).
	 */
    var camera = function () {
        this.position = new Atlantis.Vector3(0.0, 0.0, 10.0);
        this.rotation = new Atlantis.Vector3();
        this.target = new Atlantis.Vector3();
        this.reference = new Atlantis.Vector3(0.0, 0.0, 10.0);
    };

    /**
	 * Translate the camera.
	 * @param x The X value.
	 * @param y The Y value.
	 * @param z The Z value.
	 */
    camera.prototype.translate = function (x, y, z) {
        var move = new Atlantis.Vector3(x, y, z);
        var forwardMovement = Atlantis.Matrix.createRotationY(this.rotation.y);
        var v = Atlantis.Vector3.transformCoordinate(move, forwardMovement);
        this.position.x += v.x;
        this.position.y += v.y;
        this.position.z += v.z;
    };

    /**
	 * Rotation the camera (radiant)
	 * @param rx Angle on X axis.
	 * @param ry Angle on Y axis.
	 * @param rz Angle on Z axis.
	 */
    camera.prototype.rotate = function (rx, ry, rz) {
        this.rotation.x += rx;
        this.rotation.y += ry;
        this.rotation.z += rz;
    };

    /**
	 * Gets the view matrix for this camera.
	 * @return Return a view matrix.
	 */
    camera.prototype.getViewMatrix = function () {
        var rotationMatrix = Atlantis.Matrix.createRotationYawPitchRoll(this.rotation.y, this.rotation.x, this.rotation.z);
        var transformedRef = Atlantis.Vector3.transformCoordinate(this.reference, rotationMatrix);
        this.target.x = this.position.x + transformedRef.x;
        this.target.y = this.position.y + transformedRef.y;
        this.target.z = this.position.z + transformedRef.z; 
        return Atlantis.Matrix.createLookAt(this.position, this.target, Atlantis.Vector3.UnitY());
    };

    return camera;
})();
