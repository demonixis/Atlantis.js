SET js=--js=Framework\AudioManager.js
SET js=%js% --js=Framework\ContentManager.js
SET js=%js% --js=Framework\GameComponent.js
SET js=%js% --js=Framework\Graphics.js
SET js=%js% --js=Framework\Helpers.js
SET js=%js% --js=Framework\Rectangle.js
SET js=%js% --js=Framework\Vector2.js
SET js=%js% --js=Framework\Input\KeyboardState.js
SET js=%js% --js=Framework\Input\MouseState.js
SET js=%js% --js=Framework\Input\TouchState.js
SET js=%js% --js=Framework\Input\GamepadState.js
SET js=%js% --js=Framework\Game.js
SET js=%js% --js=Engine\Atlantis.js
SET js=%js% --js=Engine\StateManager.js
SET js=%js% --js=Engine\Display\Animation.js
SET js=%js% --js=Engine\Display\Entity.js
SET js=%js% --js=Engine\Display\Sprite.js
SET js=%js% --js=Engine\Display\SpriteGroup.js

java -jar ..\compiler.jar %js% --js_output_file=Build\AtlantisEngine.js