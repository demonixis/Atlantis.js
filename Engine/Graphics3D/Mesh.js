/**
 * A class that represent a mesh.
 * @author Yannick
 */
var Atlantis = window.Atlantis || {};
Atlantis.Graphics = Atlantis.Graphics || {};

Atlantis.Graphics3D.Object3D = (function () {    
    var mesh = function (String name, int verticesCount, int facesCount) {
        Atlantis.Graphics3D.Object3D.call(this);

        this.wireframe = false;
        //this.material = new Atlantis.Graphics3D.Material();
        this.name = name;
        this.vertices = [];

        for (var i = 0; i < verticesCount; i++) {
            this.vertices.push(null);
        }

        this.faces = [];

        for (var i = 0; i < facesCount; i++) {
            this.faces.push(null);   
        }
    };

    mesh.prototype = new Atlantis.Graphics3D.Object3D();

    mesh.computeNormals = function (vertices, faces) {
        for (int i = 0; i < vertices.length; i++) {
            vertices[i].normal = Vector3.Zero();
        }

        for (int i = 0; i < faces.length / 3; i++) {
            int index1 = faces[i * 3].a;
            int index2 = faces[i * 3].b;
            int index3 = faces[i * 3].c;

            // Select the face
            Vector3 side1 = Vector3.subtract(vertices[index1].position, vertices[index3].position);
            Vector3 side2 = Vector3.subtract(vertices[index1].position, vertices[index2].position);
            Vector3 normal = Vector3.cross(side1, side2);

            vertices[index1].normal.add(normal);
            vertices[index2].normal.add(normal);
            vertices[index3].normal.add(normal);
        }

        for (int i = 0; i < vertices.length; i++) {
            vertices[i].normal.normalize();
        }
    };

    // ---
    // --- Gettters and setters
    // --- 

    mesh.prototype.setFacesColor = function (color) {
        for (int i = 0, l = this.faces.length; i < l; i++) {
            this.faces[i].color = color;
        }
    };

    mesh.prototype.setFace4Color = function (index, color) {
        var workingIndex = (index >= this.faces.length - 1) ? this.faces.length - 2 : index;

        this.faces[workingIndex].color = color;
        this.faces[workingIndex + 1].color = color;
    };

    mesh.prototype.randomizeFaceColor = function (twoFaces) {
        var counter = 0;
        var step = twoFaces ? 2 : 1;
        var current;

        var faceAColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        var faceBColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

        for (var i = 0, l = this.faces.length - step; i < l; i += step) {
            current = (counter % 2 == 0) ? faceAColor : faceBColor;
            this.faces[i].color = current;
            if (twoFaces) {
                this.faces[i + 1].color = current;
            }
            counter++;
        }
    };

    mesh.prototype.randomizeHeight = function (upVector) {
        for (var i = 0, l = this.faces.length - 2; i < l; i += 2) {
            var value = Math.random();
            this.vertices[this.faces[i].a].position.add(Atlantis.Vector3.multiply(upVector, value)); 
            this.vertices[this.faces[i].b].position.add(Atlantis.Vector3.multiply(upVector, value)); 
            this.vertices[this.faces[i].c].position.add(Atlantis.Vector3.multiply(upVector, value)); 
            this.vertices[this.faces[i + 1].a].position.add(Atlantis.Vector3.multiply(upVector, value)); 
            this.vertices[this.faces[i + 1].b].position.add(Atlantis.Vector3.multiply(upVector, value)); 
            this.vertices[this.faces[i + 1].c].position.add(Atlantis.Vector3.multiply(upVector, value)); 
        }
    };

    return mesh;
})();