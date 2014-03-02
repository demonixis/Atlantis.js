AtlantisEngine.js
=================

### Summary
AtlantisEngine.js is a work in progress JavaScript 2D Game Engine using HTML5 and canvas 2D. It is mainly inspired by XNA and Flixel.
This project is separated in two parts: A Framework which is very close to XNA api, and an engine which is a port of YnaEngine (a game engine for XNA).

### The Framework (still need love)
* Content Manager
* Sprite batch (most of XNA's SpriteBatch functions are supported)
* Upscaling
* Components
* Helpers (Ajax, Custom events)
* Input (Keyboard, Mouse, Touch)
* Math tools (Vector, Matrix, etc.)

### The Engine (still need work)
* Audio manager
* Input management (Keyboard, Mouse, Touch)
* Sprite with easy animations system and a bit of physics
* SpriteGroup
* State manager

More to come later !

### Docs and demos

Take a look at the demos folders to see how it works. I'll update the documentation page as soon as possible.

### Example

```javascript
// The Game class
var TestGame = function () {
	Atlantis.Game.call(this, 800, 600);
	this.content.setRootDirectory("Content/");
	this.spriteBatch = new Atlantis.SpriteBatch(this.graphicsDevice);
	this.spriteA = null;
	this.textA = null;
	this.position = { x: 50, y: 50 };
	this.rotation = 0;
};
TestGame.prototype = new Atlantis.GameApplication();

// Initialize your objects here. 
TestGame.prototype.initialize = function () {
	Atlantis.GameApplication.prototype.initialize.call(this);
};

// Load you assets here.
TestGame.prototype.loadContent = function () {
	Atlantis.GameApplication.prototype.loadContent.call(this);
	
	var that = this;
	this.spriteA = this.content.load("atlantis_logo.jpg");
	this.textA = new Atlantis.SpriteFont();
};

// Update the game logic here as Input, Physics, etc.
TestGame.prototype.update = function (gameTime) {
	Atlantis.GameApplication.prototype.update.call(this, gameTime);

	var state = this.keyboard.getState();
  
	if (state.isKeyDown(Atlantis.Keys.Up))
		this.position.y -= 5;
	else if (state.isKeyDown(Atlantis.Keys.Down))
		this.position.y += 5;
	
	if (state.isKeyDown(Atlantis.Keys.Left))
		this.position.x -= 5;
	else if (state.isKeyDown(Atlantis.Keys.Right))
		this.position.x += 5;
	
	if (state.isKeyDown(Atlantis.Keys.Space))
		this.rotation += 0.1;
	else if (state.isKeyDown(Atlantis.Keys.Tab))
		this.rotation -= 0.1;
};

// Draw sprites and text here.
TestGame.prototype.draw = function (gameTime, context) {
	Atlantis.GameApplication.prototype.draw.call(this, gameTime, context);
	this.graphicsDevice.clear(); 
 
	this.spriteBatch.begin();
	
	// Draw simple texts.
	this.spriteBatch.drawString(this.textA, "SpriteBatch test", { x: 10, y: 15 }, "#459999");

	// Draw the sprite.
	this.spriteBatch.draw(this.spriteA, this.position, null, null, this.rotation, { x: this.spriteA.width >> 1, y: this.spriteA.height >> 1 });
	
	// Draw all of this in the screen
	this.spriteBatch.end();
};

// Start the game !
var game = new TestGame();
game.run();
```

### License
MIT License, read the LICENSE file for more informations.