AtlantisEngine.js
=================

### Summary
AtlantisEngine.js is a work in progress JavaScript 2D Game Engine using HTML5 and canvas 2D. It is mainly inspired by XNA and Flixel.

### Features
* Audio manager
* Content manager 
* Game component system
* Input management (Keyboard, Mouse, Touch)
* Helpers for ajax and events
* Sprite with easy animations system and a bit of physics
* SpriteGroup
* State and state manager

### The next
* Basic and isometric tilemap
* Scene camera
* WebGL renderer for 2D and 3D
* More utilities (like Timer, Inerpolator, etc.)

### Example

```javascript
<!-- Load the engine -->
<script src="AtlantisEngine.js"></script>
<!-- The shooter game files -->
<script src="js/Background.js"></script>
<script src="js/Enemy.js"></script>
<script src="js/Player.js"></script>
<script src="js/Game.js"></script>
<script>
    var game = new Game();

    (function loop() {
        requestAnimationFrame(loop);
        game.run();
    })();
</script>
```