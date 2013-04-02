SET js=--js=Framework\ContentManager.js
SET js=%js% --js=Framework\GameComponent.js
SET js=%js% --js=Framework\Graphics.js
SET js=%js% --js=Framework\Helpers.js
SET js=%js% --js=Framework\Rectangle.js
SET js=%js% --js=Framework\Vector2.js
SET js=%js% --js=Framework\Input\KeyboardState.js
SET js=%js% --js=Framework\Input\MouseState.js
SET js=%js% --js=Engine\AudioManager.js
SET js=%js% --js=Engine\Engine.js
SET js=%js% --js=Engine\Interpolator.js
SET js=%js% --js=Engine\StateManager.js
SET js=%js% --js=Engine\StorageManager.js
SET js=%js% --js=Engine\Graphics\Animation.js
SET js=%js% --js=Engine\Graphics\Entity.js
SET js=%js% --js=Engine\Graphics\Sprite.js
SET js=%js% --js=Engine\Graphics\SpriteGroup.js

java -jar ..\compiler.jar %js% --js_output_file=Build\AtlantisEngine.js

yuidoc .