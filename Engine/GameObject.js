var Atlantis = window.Atlantis || {};

Atlantis.GameObject = function () {
    this.name = "GameObject";
    this.enabled = true;
    this.tag = "";
    this._components = [];
    this._initialized = false;
};

Atlantis.GameObject.prototype.addComponent = function (component) {
    this._components.push(component);
};

Atlantis.GameObject.prototype.getComponent = function (name) {
    var component = null;
    
    var i = 0,
        size = this._components.length;
    
    while (i < size && component === null) {
        component = (this._components[i].name === name) ? this._components[i] : component;
        i++;
    }
    
    return component;
};

Atlantis.GameObject.prototype.removeComponent = function (name) {
    var component = this.getComponent(name);
    
    if (component) {
        var index = this._components.indexOf(component);
        this._components.splice(index, 1);
    }
};

Atlantis.GameObject.prototype.initialize = function () {
    if (!this._initialized) {
        for (var i = 0, l = this._components.length; i < l; i++) {
            this._components[i].update(gameTime);   
        }
        this._initialized = true;
    }
};

Atlantis.GameObject.prototype.update = function (gameTime) {
    if (this.enabled) {
        for (var i = 0, l = this._components.length; i < l; i++) {
            this._components[i].update(gameTime);   
        }
    }
};