SET js_framework=--js=Framework\ContentManager.js
SET js_framework=%js_framework% --js=Framework\GameComponent.js
SET js_framework=%js_framework% --js=Framework\Graphics.js
SET js_framework=%js_framework% --js=Framework\Helpers.js
SET js_framework=%js_framework% --js=Framework\Rectangle.js
SET js_framework=%js_framework% --js=Framework\Vector2.js
SET js_framework=%js_framework% --js=Framework\Input\KeyboardState.js
SET js_framework=%js_framework% --js=Framework\Input\MouseState.js

SET js_engine=--js=Engine\AudioManager.js
SET js_engine=%js_engine% --js=Engine\Engine.js
SET js_engine=%js_engine% --js=Engine\Interpolator.js
SET js_engine=%js_engine% --js=Engine\StateManager.js
SET js_engine=%js_engine% --js=Engine\StorageManager.js
SET js_engine=%js_engine% --js=Engine\Graphics\Animation.js
SET js_engine=%js_engine% --js=Engine\Graphics\Entity.js
SET js_engine=%js_engine% --js=Engine\Graphics\Sprite.js
SET js_engine=%js_engine% --js=Engine\Graphics\SpriteGroup.js

java -jar ..\compiler.jar %js_framework% --js_output_file=Build\AtlantisFramework.min.js
java -jar ..\compiler.jar %js_engine% --js_output_file=Build\AtlantisEngine.min.js
java -jar ..\compiler.jar %js_framework% %js_engine% --js_output_file=Build\AtlantisEngine.Complete.min.js

yuidoc .